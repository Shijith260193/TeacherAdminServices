exports = module.exports = Unauthorized;

function Unauthorized(msg) {
    this.name = 'Unauthorized';
    this.code = 401;
    this.msg = {
        "error": "Unauthorized_Access",
        "description": "Please try with correct credentials"
    };

    if (msg) {
        this.msg.description = msg;
    }

    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
    return this;
}
