exports = module.exports = BadSession;

function BadSession(msg) {
    this.name = 'BadSession';
    this.code = 401;
    this.msg = {
        "error": "Invalid_Session",
        "description": "Invalid Session"
    };

    if (msg) {
        this.msg.description = msg;
    }

    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
    return this;
}
