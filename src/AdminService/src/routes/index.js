const AdminService = require("../service/adminService");
const express = require("express");
const router = express.Router();
const adminDAO = require("../dao/adminDAO");
const Error = require("../../../error-utility/src");
const error = new Error();
const Utility = require("../../../common-utility/src");
const utility = new Utility();

/**
 * Routes File for the Admin Service
 */

router.get('/', (req, res, next) => {
    return res.json({
        "status": "Success", 
        "message": "Welcome to Admin Service API"
    });
});

router.get('/students', (req, res, next) => {
    AdminService.getAllStudents(req, res, (err, data) => {
        if (err) {
            console.log(err);
            res.status(err.code).send(err.msg);
        }
        else {
            res.status(200).send(data);
        }
    });
});

router.get('/teachers', (req, res, next) => {
    AdminService.getAllTeachers(req, res, (err, data) => {
        if (err) {
            console.log(err);
            res.status(err.code).send(err.msg);
        }
        else {
            res.status(200).send(data);
        }
    });
});

router.post('/register', (req, res, next) => {
    AdminService.registration(req, res, (err, data) => {
        if (err) {
            console.log(err);
            res.status(err.code).send(err.msg);
        }
        else {
            res.status(200).send(data);
        }
    });
});

router.put('/suspend', (req, res, next) => {
    AdminService.suspendStudent(req, res, (err, data) => {
        if (err) {
            console.log(err);
            res.status(err.code).send(err.msg);
        }
        else {
            res.status(200).send(data);
        }
    });
});

router.get('/commonstudents', (req, res, next) => {
    AdminService.getRegisteredStudentsForATeacher(req, res, (err, data) => {
        if (err) {
            console.log(err);
            res.status(err.code).send(err.msg);
        }
        else {
            res.status(200).send(data);
        }
    });
});

router.post('/retrievefornotifications', (req, res, next) => {
    AdminService.getStudentsForNotification(req, res, (err, data) => {
        if (err) {
            console.log(err);
            res.status(err.code).send(err.msg);
        }
        else {
            res.status(200).send(data);
        }
    });
});

router.all('*', (req, res, next) => {
    
    let data = {
        "status": "failure",
        "message": "No routes found for this request"
    };

    return res.status(404).send(data);
});


module.exports = {
    router
};
