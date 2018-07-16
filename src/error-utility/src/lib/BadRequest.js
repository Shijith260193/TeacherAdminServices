exports = module.exports = BadRequest;

function BadRequest(msg) {
    this.name = 'BadRequest';
    this.code = 400;
    this.msg = {
        "error": "Invalid_Request",
        "description": "Invalid Request"
    };

    if (msg) {
        this.msg.description = msg;
    }

    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
    return this;
}
