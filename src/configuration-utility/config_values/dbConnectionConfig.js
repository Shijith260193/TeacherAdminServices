

/*eslint-disable */

var mySqlConnection= {
    databaseType:'mysql',
    host: '35.226.7.96',
    user:'root',
    password:'root',
    connectionLimit:10,
    database:'openbanking',
    debug:false,
    connectTimeout:2000,
    ssl:'Amazon RDS',
};


exports.mySqlConnection=mySqlConnection;
