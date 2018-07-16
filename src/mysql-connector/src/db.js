/*
 * Created by Avinash on 05/30/18.
 * This module Connects to DB
 * */

/*eslint-disable */

var mysql = require("mysql");
var configuration = require('config');
var config=new configuration().dbConnectionConfig;
const read_pool = mysql.createPool({
    connectionLimit: config.mySqlConnection.connectionLimit, //important
    host: config.mySqlConnection.host,
    user: config.mySqlConnection.user,
    password: config.mySqlConnection.password,
    database: config.mySqlConnection.database,
    debug: config.debug,
    connectTimeout: config.mySqlConnection.connectTimeout,
    insecureAuth : true

    // ssl: config.readConnection.ssl
});
const  write_pool = mysql.createPool({
    connectionLimit: config.mySqlConnection.connectionLimit, //important
    host: config.mySqlConnection.host,
    user: config.mySqlConnection.user,
    password: config.mySqlConnection.password,
    database: config.mySqlConnection.database,
    debug: config.mySqlConnection.debug,
    connectTimeout: config.mySqlConnection.connectTimeout,
    insecureAuth : true
    // ssl: config.writeConnection.ssl
});
const failover_read_pool = mysql.createPool({
    connectionLimit: config.mySqlConnection.connectionLimit,
    host: config.mySqlConnection.host,
    user: config.mySqlConnection.user,
    password: config.mySqlConnection.password,
    database: config.mySqlConnection.database,
    debug: config.mySqlConnection.debug,
    connectTimeout: config.mySqlConnection.connectTimeout,
    insecureAuth : true
    // ssl: config.writeConnection.ssl
});



// var nextTick = process.nextTick;
//
// process.nextTick = function (callback) {
//     if (typeof callback !== 'function') {
//         console.trace(typeof callback + ' is not a function');
//     }
//     return nextTick(callback);
// };

function getReadConnection(callback) {
    read_pool.getConnection(function (err, conn) {
        if (err) {
            console.log('error getting connection from read pool');
            if (err.fatal && err.fatal === true) {
                return getFailoverReadConnection(callback);
            } else {
                return callback(err, null);
            }

        }
        callback(null, conn);
    });
}

function getFailoverReadConnection(callback) {
    failover_read_pool.getConnection(function (err, conn) {
        console.log("fail-over read connection");
        if (err) {
            console.log('error getting connection from fail-over read pool');
            return callback(err, null);
        }
        callback(null, conn);
    });
}

function getWriteConnection(callback) {

    write_pool.getConnection(function (err, conn) {
        if (err) {
            console.log('error getting connection from write pool');
            return callback(err, null);
        }
        callback(null, conn);
    });

}

exports.getReadConnection = getReadConnection;
exports.getWriteConnection = getWriteConnection;

/*** to Use for GET requests */

exports.queryWithParams = function (string, params, callback) {
    getReadConnection(function (err, con) {
        if (err) {
            callback(err, null);
        } else {
            con.query(string, params, function (err, rows) {
                releaseConnection(con);

                if (err) {
                    callback(err, null);
                } else {
                    callback(null, rows);
                }
            });
        }
    });
};


/*** to Use for GET requests */

exports.queryWithOptions = function (options, callback) {
    getReadConnection(function (err, con) {
        if (err) {
            callback(err, null);
        } else {
            con.query(options, function (err, rows) {

                releaseConnection(con);

                if (err) {
                    callback(err, null);
                } else {
                    callback(null, rows);
                }
            });
        }
    });
};


/*** to Use for POST,PUT, DELETE requests */

exports.executeWithParams = function (string, params, callback) {
    getWriteConnection(function (err, con) {
        if (err) {
            callback(err, null);
        } else {
            con.query(string, params, function (err, rows) {

                releaseConnection(con);

                if (err) {
                    callback(err, null);
                } else {
                    callback(null, rows);
                }
            });
        }
    });
};

/*** to Use for POST,PUT,DELETE requests */

exports.executeWithOptions = function (options, callback) {
    getWriteConnection(function (err, con) {
        if (err) {
            callback(err, null);
        } else {
            con.query(options, function (err, rows) {

                releaseConnection(con);

                if (err) {
                    callback(err, null);
                } else {
                    callback(null, rows);
                }
            });
        }
    });
};

/** Multiple sequeneced updates/inserts with/without transaction support */

exports.executeMultipleWithOptions = function (mOptions, isTransaction, callback) {

    if (!mOptions || (!(mOptions instanceof Array)) || mOptions.length <= 0) {
        callback(null, null);
    } else {
        getWriteConnection(function (err, con) {
            if (err) {
                callback(err, null);
            } else {
                if (isTransaction) {
                    con.beginTransaction(function (err) {
                        if (err) {
                            callback(err, null);
                        } else {
                            var resultList = new Array(mOptions.length);
                            executeSequencedQuery(mOptions, 0, con, resultList, function (err) {
                                if (err) {
                                    rollbackTransaction(con, err, callback);
                                } else {
                                    commitTransaction(con, resultList, callback);
                                }
                            });


                        }

                    });
                } else {
                    var resultList = new Array(mOptions.length);
                    executeSequencedQuery(mOptions, 0, con, resultList, function (err) {
                        releaseConnection(con);
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, resultList);

                        }
                    });


                }

            }
        });
    }

};

exports.escape = mysql.escape;


function rollbackTransaction(con, err, callback) {
    con.rollback(function () {
        releaseConnection(con);
        callback(err, null);
    });
}

function commitTransaction(con, result, callback) {
    con.commit(function (err) {
        if (err) {
            rollbackTransaction(con, err, callback);
        } else {
            try {
                con.release();
            } catch (e) {
                console.log("Error while releasing connection" + e);
            }
            callback(null, result);
        }

    });
}

function releaseConnection(con) {
    try {
        con.release();
    } catch (e) {
        console.log("Error while releasing connection" + e);
    }
}

function executeSequencedQuery(mOptions, i, con, resultList, callback) {

    var options = mOptions[i];
    con.query(options, function (err, rows) {
        if (err) {
            callback(err);
        } else {
            resultList[i] = rows;
            if ((i + 1) < mOptions.length) {
                executeSequencedQuery(mOptions, i + 1, con, resultList, function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null);
                    }
                });
            } else {
                callback(null);
            }
        }
    });

}
