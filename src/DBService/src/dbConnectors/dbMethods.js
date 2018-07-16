const db = require('../../../mysql-connector/src');
const ErrorMod = require('../../../error-utility/src');
const Error = new ErrorMod();

/*eslint-disable */

exports.executeQuery = function (options, callback) {
    var error;
    db.queryWithOptions(options, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            if (result && result.length > 0) {
                return callback(null, result);
            } else {
                error = new Error.NotFound('Records not found');//InternalServerError
                callback(error, null);
            }

        }
    });
};

exports.executePostQueryWithOptions=function(options, callback) {
    var error;
    db.executeWithOptions(options, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            if (result.affectedRows >= 0 ||result.length >= 0) {
                return callback(null, result);
            } else {
                error = new Error.CallFailed('Unable to create new Records');//InternalServerError
                callback(error, null);
            }

        }
    });
};