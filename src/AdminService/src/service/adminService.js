let adminDAO = require("../dao/adminDAO");
let Error = require("../../../error-utility/src");
let error = new Error();
let Utility = require("../../../common-utility/src");
let utility = new Utility();
let requestValidator = require("../helper/adminRequestValidator");
let async = require('async');
let request = require('request');
let rp = require('request-promise');

const getAllStudents = (req, res, callback) => {
    async.waterfall([
        function Validtor (callback) {
            requestValidator.AdminRequestValidator(req, (err, validData) => {
                if (err) {
                    return callback(err, null);
                }
                
                return callback(null, req);
            });
        },
        function getStudents (req, callback) {
            adminDAO.getStudents(req, (err, studentData) => {
                if (err) {
                    return callback(err, null);
                }

                let result = JSON.parse(JSON.stringify(studentData));
                
                return callback(null, result);
            });
        } 
    ], function finalCallback (err, results) {
        if (!err && results) { 
            return callback(null, results);
        };

        return callback(err, null);
        
    })
};


const getAllTeachers = (req, res, callback) => {
    async.waterfall([
        function Validtor (callback) {
            requestValidator.AdminRequestValidator(req, (err, validData) => {
                if (err) {
                    return callback(err, null);
                }
                
                return callback(null, req);
            });
        },
        function getTeachers (req, callback) {
            adminDAO.getTeachers(req, (err, studentData) => {
                if (err) {
                    return callback(err, null);
                }

                let result = JSON.parse(JSON.stringify(studentData));
                
                return callback(null, result);
            });
        } 
    ], function finalCallback (err, results) {
        if (!err && results) { 
            return callback(null, results);
        };

        return callback(err, null);
        
    });
};


const registration = (req, res, callback) => {
    async.waterfall([
        function Validtor (callback) {
            requestValidator.AdminRequestValidator(req, (err, ValidRequest) => {
                if (err) {
                    return callback(err, null);
                }

                return callback(null, req);
            });
        },
        function postValidator (req, callback) {
            requestValidator.ValidateRegisterRequest(req, (err, ValidRequest) => {
                if (err) {
                    return callback(err, null)
                }
                
                return callback(null, req);
            });
        },
        function preRegister (req, callback) {

            if (req.body.teacher && req.body.students) {
                adminDAO.getTeacherDetailsByEmailIds([req.body.teacher], (err, TeacherRecord) => {
                    if (err) {
                        return callback(err, null);
                    }
                    
                    req.TeacherData = JSON.parse(JSON.stringify(TeacherRecord));
                    
                    console.log(JSON.stringify(req.TeacherData));

                    adminDAO.getStudentDetailsByEmailIds(req.body.students, (err, StudentRecords) => {
                        if (err) {
                            return callback(err, null);
                        }
                        
                        req.StudentData = JSON.parse(JSON.stringify(StudentRecords));
                        console.log(JSON.stringify(req.StudentData));

                        return callback(null, req);
                    });
                });
                
            }
            else if (req.body.teachers && req.body.student) {
                adminDAO.getTeacherDetailsByEmailIds(req.body.teachers, (err, TeacherRecords) => {
                    if (err) {
                        return callback(err, null);
                    }
                    
                    req.TeacherData = JSON.parse(JSON.stringify(TeacherRecords));
                    
                    console.log(JSON.stringify(req.TeacherData));

                    adminDAO.getStudentDetailsByEmailIds([req.body.student], (err, StudentRecord) => {
                        if (err) {
                            return callback(err, null);
                        }
                        
                        req.StudentData = JSON.parse(JSON.stringify(StudentRecord));
                        console.log(JSON.stringify(req.StudentData));

                        return callback(null, req);
                    });
                });
            }
            else {

                return callback(error.BadRequest("not valid body params"), null);
            }
            
            
        },
        function register (req, callback) {  
            let response = {
                "status": "success",
                "message": "Successfully Registered"
            } 
            
            req.StudentData.forEach((eachStudent) => {
                let temp = {};
                
                temp.registerId = utility.uuid();
                temp.registeredTeacherId = req.TeacherData[0].teacherId;
                temp.registeredStudentId = eachStudent.studentId;

                adminDAO.getRegisterId(temp, (err, data) => {
                    if (err) {
                        
                        adminDAO.createRegistration(temp, (err, data) => {
                            if (err) {
                                
                                return callback(err, null);
                            }
                            
                            return callback(null, response);
                            
                        });
                    }
                    else {
                        
                        return callback(error.BadRequest("Failed to create the Registration as it already exists"), null);
                    }      
                });
            }); 
        }

    ], function finalCallback (err, results) {
        if (!err && results) { 
            return callback(null, results);
        };

        return callback(err, null);
        
    });
};

const suspendStudent = (req, res, callback) => {
    async.waterfall([
        function Validtor (callback) {
            requestValidator.AdminRequestValidator(req, (err, ValidRequest) => {
                if (err) {
                    return callback(err, null);
                }

                return callback(null, req);
            });
        },
        function putRequestValidator (req, callback) {
            requestValidator.validateSuspendRequest(req, (err, ValidData) => {
                if (err) {
                    return callback(err, null);
                }

                return callback(null, req);
            });
        },
        function suspend (req, callback) {
            adminDAO.suspendStudentWithMailId(req.body.student, (err, updated) => {
                if (err) {
                    return callback(err, null);
                }

                adminDAO.getStudentDetailsByEmailIds([req.body.student], (err, record) => {
                    if (err) {
                        return callback(err, null);
                    }

                    return callback(null, JSON.parse(JSON.stringify(record)));
                });
            });
        }
    ], function finalCallback (err, results) {
        if (!err && results) { 
            return callback(null, results);
        };

        return callback(err, null);
        
    });
};

const getRegisteredStudentsForATeacher = (req, res, callback) => {
    async.waterfall([
        function Validtor (callback) {
            requestValidator.AdminRequestValidator(req, (err, ValidRequest) => {
                if (err) {
                    return callback(err, null);
                }

                return callback(null, req);
            });
        },
        function getRegisteredStudents (req, callback) {
            if (req.query.teacher) {
                adminDAO.getRegisteredStudentsForTeacher(req.query.teacher, (err, record) => {
                    if (err) {
                        return callback(err, null);
                    }

                    let data = JSON.parse(JSON.stringify(record));
                    
                    return callback(null, data);
                });
            }
            else {
                return callback(error.BadRequest("Only teacher query param in accepted"), null);
            }
            

        }
    ], function finalCallback (err, results) {
        if (!err && results) { 
            return callback(null, results);
        };

        return callback(err, null);
        
    });
};

const getStudentsForNotification = (req, res, callback) => {
    async.waterfall([
        function RequestValidator (callback) {
            requestValidator.AdminRequestValidator(req, (err, validData) => {
                if (err) {
                    return callback(err, null);
                }

                return callback(null, req);
            });
        },
        function NotificationRequestValidator (req, callback) {
            requestValidator.validateNotificationRequest(req, (err, validData) => {
                if (err) {
                    return callback(err, null);
                }
                
                return callback(null, req);
            });
        },
        function Retrieve (req, callback) {
            let data = {
                "recepients": []
            };

            req.body.notification.split(" ").forEach((each) => {
                if (each.startsWith('@')) {
                    data.recepients.push(each.slice(1));
                }
            });

            adminDAO.getTeacherDetailsByEmailIds([req.body.teacher], (err, TeacherData) => {
                if (err) {
                    return callback(err, null);
                }

                let teacherData = JSON.parse(JSON.stringify(TeacherData));
                let teacherID = teacherData[0].teacherId;

                adminDAO.getStudentsNotifiedByTeacher(teacherID, (err, Record) => {
                    if (err) {
                        return callback(err, null);
                    }

                    let mailRecord = JSON.parse(JSON.stringify(Record));

                    mailRecord.forEach((eachMailObj) => {
                        if (data.recepients.indexOf(eachMailObj.emailId) < 0) {
                            data.recepients.push(eachMailObj.emailId);
                        }
                    });

                    return callback(null, data);
                })
            })
        }
    ], function finalCallback (err, results) {
        if (!err && results) { 
            return callback(null, results);
        };

        return callback(err, null);
        
    })
}


module.exports = {
    getAllStudents,
    getAllTeachers,
    registration,
    suspendStudent,
    getRegisteredStudentsForATeacher,
    getStudentsForNotification
};

