const Error = require("../../../error-utility/src");
const error = new Error();
const Utility = require("../../../common-utility/src");
const utility = new Utility();

/**
 * Validating the Request
 */

const AdminRequestValidator = (req, callback) => {
    if (utility.isNull(req)) {

        return callback(error.BadRequest("Invalid request"), null);
    }
    else if (req.headers["content-type"] !== 'application/json') {

        return callback(error.BadRequest("Invalid/Missing header for the Content Type"), null);
    }

    return callback(null, true);
    
};

const ValidateRegisterRequest = (req, callback) => {
    
    if (req.method === 'POST') {
        if (req.body.teacher || req.body.student || req.body.teachers || req.body.students) {
            
            return callback(null, req);
        }
        
        return callback(error.BadRequest("Both teacher and student should be available in body for registration"), null);
    }

    return callback(error.BadRequest("Should be a POST request"), null);
    
};

const validateSuspendRequest = (req, callback) => {
    if (req.method === 'PUT') {
        if (req.body.student) {

            return callback(null, req);
        }
        
        return callback(error.BadRequest("Only student can be suspended"), null);
    }
    
    return callback(error.BadRequest("Should be a valid PUT request"), null);
};

const validateNotificationRequest = (req, callback) => {
    if (req.method === 'POST') {
        if (req.body.teacher && req.body.notification) {
            return callback(null, req);
        }
        
        return callback(error.BadRequest("teacher and notification are manadatory body parameters"), null);
    }

    return callback(error.BadRequest("Should be a valid POST request"), null);
}

module.exports = {
    AdminRequestValidator,
    ValidateRegisterRequest,
    validateSuspendRequest,
    validateNotificationRequest
};
