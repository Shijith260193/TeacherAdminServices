/*eslint-disable */

exports = module.exports = errors;

var NotFound = require('./NotFound');
var BadSession = require('./BadSession');
var BadRequest = require('./BadRequest');
var CallFailed = require('./CallFailed');
var Unauthorized = require('./Unauthorized');
var ServiceUnAvailable = require('./ServiceUnAvailable');

function errors() {
    'use strict';
}
exports.error_handler = function error_handler(err, req, res) {
    console.error(err.stack);
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.status(err.code || 500).send(JSON.stringify(err.msg, undefined, 2));
};

errors.prototype.NotFound = NotFound;
errors.prototype.BadRequest = BadRequest;
errors.prototype.BadSession = BadSession;
errors.prototype.CallFailed = CallFailed;
errors.prototype.Unauthorized = Unauthorized;
errors.prototype.ServiceUnAvailable = ServiceUnAvailable;

errors.prototype.Forbidden = Forbidden;
function Forbidden(msg) {
    this.msg = {"error": this.name, "description": msg || "Access Forbidden"};
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
    return this;
}
Forbidden.prototype.name = 'Forbidden';
Forbidden.prototype.code = 403;
Forbidden.prototype.__proto__ = Error.prototype;