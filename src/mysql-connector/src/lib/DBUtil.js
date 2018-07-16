/**
 * Created by Avinash on 06/1/18.
 */

exports = module.exports = DBUtil;

var nodeUuid = require('node-uuid');

function DBUtil() {
    'use strict'; //
}

DBUtil.prototype.uuid = function uuid() {
    return nodeUuid.v4();
};

DBUtil.prototype.addIfDefined = addIfDefined;
function addIfDefined(Obj, name, prop, hasProperty) {
    if ((prop !== null && typeof prop !== 'undefined' && prop !== "") || hasProperty) {
        Obj[name] = prop;
    }
}