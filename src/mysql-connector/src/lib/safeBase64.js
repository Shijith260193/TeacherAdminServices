// safeBase64.js
//
(function (exports) {
    "use strict";

    // returns safe base64 string
    exports.encode = function (buf) {
        return buf.toString('base64').replace(/Z/g, 'Zz').replace(/\+/g, 'Zp').replace(/\//g, 'Zs').replace(/=/g, 'Ze');
    };

    // returns buffer
    exports.decode = function (str) {
        return Buffer(str.replace(/Ze/g, '=').replace(/Zs/g, '/').replace(/Zp/g, '+').replace(/Zz/g, 'Z'), 'base64');
    };

}(typeof exports === "undefined" ? (this.safeBase64 = {}) : exports));
