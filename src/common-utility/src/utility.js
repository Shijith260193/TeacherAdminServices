/*eslint-disable */
exports = module.exports = utility;

var stringUUID = require('node-uuid');

var intUuid = require('node-datetime');

function utility() {
    'use strict';
}

utility.prototype.uuid = function uuid() {
    return stringUUID.v4();
};


utility.prototype.intUUID= function intUUID(){
    var id=intUuid.create(new Date());
    return id._created;
};


utility.prototype.isNull = function isNull(item) {
    return item == null || item == "" || typeof item == 'undefined';
};

utility.prototype.isNotNull = function isNotNull(item) {
    return item != null && item != "" && typeof item != 'undefined';
};

utility.prototype.isNotEmpty = function isNotEmpty(item) {
    return item != null && item != "" && typeof item != 'undefined' && item.length > 0;
};

utility.prototype.addIfDefined = function addIfDefined(Obj, name, prop) {
    if (prop && typeof prop != 'undefined') {
        Obj[name] = prop;
    }
};

