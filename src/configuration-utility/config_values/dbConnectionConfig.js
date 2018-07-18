

/*eslint-disable */

var mySqlConnection= {
    databaseType:'mysql',
    host: 'localhost',
    user:'admin',
    password:'adminPass',
    connectionLimit:10,
    database:'Academy',
    debug:false,
    connectTimeout:2000
};


exports.mySqlConnection=mySqlConnection;
