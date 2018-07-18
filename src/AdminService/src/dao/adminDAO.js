let Error = require("../../../error-utility/src");
let error = new Error();
let db = require("../../../DBService/src/dbConnectors/dbMethods");
let dbMapperValues = require("../../src/mapper/dbMapper/adminDBMapper");


const getStudents = (req, callback) => {
    let sqlQuery = `select`;
    let sqlValues = [];

    dbMapperValues.getAllStudents.forEach((eachStudent) => {
        sqlQuery += ` STUD.${eachStudent},`;
    });

    sqlQuery = sqlQuery.substring(0, sqlQuery.length - 1);
    sqlQuery += " from students STUD";
    if (req.query.limit) {
        sqlQuery +=` limit ${req.query.limit}`;
    }
    let options = {
        "sql": sqlQuery,
        "values": sqlValues
    };
    
    db.executeQuery(options, (err, recordList) => {
        if (err) {
            return callback(error.BadRequest("Failed to fetch the students"), null);
        }

        return callback(null, recordList);
        
    });
};

const getTeachers = (req, callback) => {
    let sqlQuery = `select`;
    let sqlValues = [];

    dbMapperValues.getAllTeachers.forEach((eachStudent) => {
        sqlQuery += ` TEACH.${eachStudent},`;
    });

    sqlQuery = sqlQuery.substring(0, sqlQuery.length - 1);
    sqlQuery += " from teachers TEACH";
    if (req.query.limit) {
        sqlQuery +=` limit ${req.query.limit}`;
    }
    let options = {
        "sql": sqlQuery,
        "values": sqlValues
    };
    
    db.executeQuery(options, (err, recordList) => {
        if (err) {
            return callback(error.BadRequest("Failed to fetch the teachers"), null);
        }

        return callback(null, recordList);
        
    });
};

const getTeacherDetailsByEmailIds = (emailIds, callback) => {
    let sqlQuery = `select`;
    let sqlValues = [];
    let inquery = '(';

    emailIds.forEach((eachEmail) => {
        inquery += `'${eachEmail}',`;
    });
    inquery = inquery.slice(0, -1);
    inquery += ');'
    
    
    dbMapperValues.getAllTeachers.forEach((eachStudent) => {
        sqlQuery += ` TEACH.${eachStudent},`;
    });

    sqlQuery = sqlQuery.substring(0, sqlQuery.length - 1);
    sqlQuery += ` from teachers TEACH where TEACH.emailId IN ${inquery}`;
    
    let options = {
        "sql": sqlQuery,
        "values": sqlValues
    };
    
    db.executeQuery(options, (err, recordList) => {
        if (err) {
            return callback(err, null);
        }

        return callback(null, recordList);
        
    });
};

const getStudentDetailsByEmailIds = (emailIds, callback) => {
    let sqlQuery = `select`;
    let sqlValues = [];
    let inquery = '(';

    emailIds.forEach((eachEmail) => {
        inquery += `'${eachEmail}',`;
    });
    inquery = inquery.slice(0, -1);
    inquery += ');'
    
    
    dbMapperValues.getAllStudents.forEach((eachStudent) => {
        sqlQuery += ` STUD.${eachStudent},`;
    });

    sqlQuery = sqlQuery.substring(0, sqlQuery.length - 1);
    sqlQuery += ` from students STUD where STUD.emailId IN ${inquery}`;
    
    let options = {
        "sql": sqlQuery,
        "values": sqlValues
    };
    
    db.executeQuery(options, (err, recordList) => {
        if (err) {
            return callback(err, null);
        }

        return callback(null, recordList);
        
    });
};

const createRegistration = (registerObj, callback) => {
    
    let sqlQuery = "INSERT into REGISTER SET ?"
    let options = {
        "sql": sqlQuery,
        "values": [registerObj]
    };

    
    db.executePostQueryWithOptions(options, (err, recordList) => {
        if (err) {
            console.log(err);

            return callback(error.BadRequest("Failed to create the Registration as it already exists"), null);
        }

        return callback(null, recordList);
        
    });
};

const suspendStudentWithMailId = (studentMailId, callback) => {

    let sqlQuery = "UPDATE students STUD SET STUD.isSuspended = 1 where STUD.emailId = ?";
    let options = {
        "sql": sqlQuery,
        "values": [studentMailId]
    };
    
    db.executePostQueryWithOptions(options, (err, recordList) => {
        if (err) {
            return callback(error.BadRequest("Failed to update the student with suspension flag"), null);
        }

        return callback(null, recordList);
        
    });
};

const getRegisteredStudentsForTeacher = (emailIds, callback) => {
    let sqlQuery = "select STUD.* from teachers TEACH join Register REG join students STUD " +
        " where REG.registeredTeacherId = TEACH.teacherId and TEACH.emailId in";
    let inquery = '(';
    
    emailIds.forEach((eachEmail) => {
        inquery += `'${eachEmail}',`;
    });
    inquery = inquery.slice(0, -1);
    inquery += ')';
    sqlQuery += `${inquery} and STUD.studentId in (REG.registeredStudentId)`;

    
    let options = {
        "sql": sqlQuery,
        "values": []
    };
    
    db.executePostQueryWithOptions(options, (err, recordList) => {
        if (err) {
            return callback(err, null);
        }

        return callback(null, recordList);
        
    });
};

const getStudentsNotifiedByTeacher = (teacherId, callback) => {
    let options = {
        "sql": 'select STUD.emailId from students STUD  join Register  REG where ' +
            'STUD.isSuspended = 0 and REG.registeredTeacherId = ? and STUD.studentId = REG.registeredStudentId',
        "values": [teacherId]
    };
    
    db.executePostQueryWithOptions(options, (err, recordList) => {
        if (err) {
            return callback(error.BadRequest("Failed to fetch the students notified by teacher"), null);
        }

        return callback(null, recordList);
        
    });
};

const getRegisterId = (registered, callback) => {
    let options = {
        "sql": 'select REG.registerId from Register REG where REG.registeredStudentId = ? and REG.registeredTeacherId = ?',
        "values": [registered.registeredStudentId, registered.registeredTeacherId]
    };

    db.executeQuery(options, (err, recordList) => {
        if (err) {
            
            return callback(err, null);
        }

        console.log("here json"+JSON.stringify(recordList));

        return callback(null, recordList);
        
    });
}

module.exports = {
    getStudents,
    getTeachers,
    getTeacherDetailsByEmailIds,
    getStudentDetailsByEmailIds,
    createRegistration,
    suspendStudentWithMailId,
    getRegisteredStudentsForTeacher,
    getStudentsNotifiedByTeacher,
    getRegisterId
};
