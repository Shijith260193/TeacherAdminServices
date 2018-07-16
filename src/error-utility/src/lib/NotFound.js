exports = module.exports = NotFound;
function NotFound(msg) {
    this.name = 'NotFound';
    this.code = 404;
    this.msg = {
        "error": "Not_Found_Entity",
        "description": "Requested resource does not exist"
    };

    if (msg) {
        this.msg.description = msg;
    }
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
    return this;
}
