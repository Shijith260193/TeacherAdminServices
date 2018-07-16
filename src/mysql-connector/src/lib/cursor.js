'use strict';

var crypto = require('crypto');

var algorithm = 'aes-256-ctr';
var password = 'cursorPasswordForExchange';
var timeoutMillis = 1000 * 60 * 30;//30 mins in milliseconds
var imgTimeout = 1000 * 60 * 2160; //24 hours


var cursor = {};

cursor.getInitialCursor = function (lastRowId, options) {
    //Logger.debug(options);
    var sourceObj = {
        r: Math.floor(Math.random() * 100000),
        off: lastRowId,
        lim: options.limit,
        v: 1,
        uri: options.uri,
        ttl: Date.now() + timeoutMillis //24 hours in milliseconds
    };

    return (encrypt(buildSource(sourceObj)));

};

cursor.getImageUrl = function (imgId) {
    var imageObj = {
        r: Math.floor(Math.random() * 100000),
        id: imgId,
        ttl: Date.now() + imgTimeout
    };
    return (encrypt(buildSource(imageObj)));
};

cursor.validateImageUrl = function (imgUrl) {
    var source = null;
    var result = {};
    try {
        source = decrypt(imgUrl);
        if (source == '') {
            throw 'Invalid cursor.'
        }
    } catch (e) {
        console.log(e.stack);
        result.isValid = false;
        result.error = 'Decrypt Error';
        return result;
    }
    var imgObj = decodeObject(source);
    if (imgObj.ttl < Date.now()) {
        //Logger.debug('cursor expired');
        result.isValid = false;
        result.error = 'Expired Cursor';
        return result;
    }
    result.isValid = true;
    result.imageId = imgObj.id;
    return result;

};

cursor.updateCursor = function (lastRowId, options) {

    //Logger.debug('request cursor: '+options.cursor);
    var source = null;
    try {
        source = decrypt(options.cursor);
        if (source == '') {
            throw 'Invalid cursor.'
        }
    } catch (e) {
        console.log(e.stack);
        return false;
    }
    //Logger.debug('decrypted cursor: '+source);
    var cursorParams = source.split('|');

    var decryptedParams = {
        r: null,
        off: null,
        lim: null,
        v: null,
        uri: null,
        ttl: null
    };
    for (var i = 0; i < cursorParams.length; i++) {
        decryptedParams[cursorParams[i].split('=')[0]] = cursorParams[i].split('=')[1];
    }
    decryptedParams.r = Math.floor(Math.random() * 100000);
    decryptedParams.ttl = Date.now() + timeoutMillis; //24 hours in milliseconds
    decryptedParams.off = lastRowId;
    if (options.limit) {
        decryptedParams.lim = options.limit;
    }

    var newCursor = encrypt(buildSource(decryptedParams));
    //Logger.debug('updated cursor: '+ newCursor);
    return newCursor;

};

cursor.validateCursor = function (options) {
    //Logger.debug('in validate cursor');
    var validation = {
        isValid: true,
        error: ''
    };

    var source = null;
    try {
        source = decrypt(options.cursor);
        //Logger.debug(source);
        if (source == '') {
            throw 'Invalid cursor.';
        }
    } catch (e) {
        validation.isValid = false;
        validation.error = 'Error reading cursor.';
        return validation;
    }
    var cursorParams = source.split('|');
    var decryptedParams = {
        r: null,
        off: null,
        lim: null,
        v: null,
        uri: null,
        ttl: null
    };
    for (var i = 0; i < cursorParams.length; i++) {
        decryptedParams[cursorParams[i].split('=')[0]] = cursorParams[i].split('=')[1];
    }
    //Logger.debug(options);
    //Logger.debug(decryptedParams);
    //validate that this cursor is for the request
    if (!options.uri || !decryptedParams.uri || options.uri.toUpperCase() !== decryptedParams.uri.toUpperCase()) {
        validation.isValid = false;
        validation.error = 'Invalid Cursor';
        return validation;
    }
    if (decryptedParams.ttl < Date.now()) {
        //Logger.debug('cursor expired');
        validation.isValid = false;
        validation.error = 'Expired Cursor';
        return validation;
    }

    validation.offset = decryptedParams.off;
    if (options.limit) {
        validation.limit = options.limit;
    } else {
        validation.limit = decryptedParams.lim;
    }


    return validation;
};

module.exports = cursor;

var SafeBase64 = require("./safeBase64.js");

function encrypt(text) {
    try {
        var cipher = crypto.createCipher(algorithm, password);
        var cryptedBuffers = [cipher.update(new Buffer(text))];
        cryptedBuffers.push(cipher.final());
        var crypted = Buffer.concat(cryptedBuffers);
        crypted = SafeBase64.encode(crypted);
        //Logger.debug('encrypted cursor: '+crypted);
        return crypted;
    } catch (e) {
        Logger.error(e.stack);
        return '';
    }

}

function decrypt(text) {
    try {
        var decipher = crypto.createDecipher(algorithm, password);
        var decryptedBuffers = [decipher.update(new Buffer(SafeBase64.decode(text)))];
        decryptedBuffers.push(decipher.final());
        var dec = Buffer.concat(decryptedBuffers).toString('utf8');
        // Logger.debug('decrypted cursor: '+dec);
        return dec;
    } catch (e) {
        Logger.error(e.stack);
        return '';
    }

}

function hash(text) {
    var hash = crypto.createHash('md5');
    hash = hash.update(text);
    return hash;
}

function buildSource(data) {

    var source = '';
    for (var key in data) {
        source += '|' + key + '=' + data[key];
    }
    source = source.slice(1);
    //Logger.debug(source);
    return source;
}

function decodeObject(source) {
    var params = source.split('|');
    var decodedObject = {};
    for (var i = 0; i < params.length; i++) {
        var param = params[i].split('=');
        decodedObject[param[0]] = param[1];
    }
    return decodedObject;
}