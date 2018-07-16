exports = module.exports = CallFailed;

function CallFailed(msg) {
    this.name = 'CallFailed';
    this.code = 500;
    this.msg = {
        "error": "Backend_Call_Failed",
        "description": "Requested call has failed"
    };

    if (msg) {
        this.msg.description = msg;
    }
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
    return this;
}
