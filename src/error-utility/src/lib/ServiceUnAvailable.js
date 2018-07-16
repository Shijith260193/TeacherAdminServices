exports = module.exports = ServiceUnAvailable;

function ServiceUnAvailable(msg) {
    this.name = 'ServiceUnAvailable';
    this.code = 503;
    this.msg = {
        "error": "Service_Unavailable",
        "description": "Requested Service Unavailable"
    };

    if (msg) {
        this.msg.description = msg;
    }
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
    return this;
}
