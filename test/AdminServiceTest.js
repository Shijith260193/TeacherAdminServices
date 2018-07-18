const chai = require('chai');
const expect = chai.expect;
const axios = require('axios');
const should = chai.should();
const assert = chai.assert;
const supertest = require('supertest');
const api = supertest('http://localhost:3000/api');
const ContentTypeHeader = {"Content-Type": "application/json"}


chai.use(require('chai-like'));
chai.use(require('chai-things'));

describe('Admin Service Test Cases', () => {

    /**
     * 
     * Happy Flow Request
     * 
     */
    // Welcome API 

    it(`Welcome Page / GET`, (done) => {
        api.get('/')
        .set('Accept', 'application/json')
        .expect(200,done);
    });

    // Get All Students
    it(`Should return all students /students GET`, (done) => {
        api.get('/students')
        .set('Content-Type', 'application/json')
        .expect(200,done);
    });


    // Get All Teachers
    it(`Should return all teachers /teachers GET`, (done) => {
        api.get('/teachers')
        .set('Content-Type', 'application/json')
        .expect(200,done);
    });


    //Get Registered Students for a given Teachers
    it(`Should return all Registered Students for a given Teachers /commonstudents?teacher=racheal@digital.com&teacher=susan@digital.com GET`, (done) => {
        api.get('/commonstudents')
        .query({
            'teacher[]':['racheal@digital.com','susan@digital.com']
        })
        .set('Content-Type', 'application/json')
        .expect(200,done);
    });


    // Suspend a Student
    it(`Should return the suspended Student detail with updated values /suspend PUT`, (done) => {
        api.put('/suspend')
        .set('Content-Type', 'application/json')
        .send({
            "student":"george@digital.com"
        })
        .expect(200,done);
        
        
    });

    //Register a Student for a Teacher or Register a Teacher for a Student
    it(`Should return the success message for registration in  /register POST`, (done) => {
        api.post('/register')
        .set('Content-Type', 'application/json')
        .send({
            "teacher":"philip@digital.com",
            "students":["agnes@digital.com","james@digital.com"]
        })
        .expect(400,done)
        
        
    });


    //Get the lIst Students thats has been notified by Teacher specifically or registered under their name

    it(`Should return the suspended Student detail with updated values /retrievefornotifications POST`, (done) => {
        api.post('/retrievefornotifications')
        .set('Content-Type', 'application/json')
        .send({
            "teacher":"susan@digital.com",
            "notification":"Hello Students !!!! @james@digital.com"
        })
        .expect(200, done)
        
        
    });

    /**
     * 
     * 
     * Validations for every request
     * 
     */

    // Unidetified routes for 404 Not found
    it('should return 404 for unidentified routes', (done) => {
        api.get('/xyz')
        .set('Content-Type', 'application/json')
        .expect(404)
        done();
        
        
    });

    //validation of request without header Content-Type
    // Get All Teachers
    it(`Should return all teachers /teachers GET`, (done) => {
        api.get('/teachers')
        .expect(400,done);
    });


    //Validating the req body which are mandatory
    it(`Should return  400 Badrequest detail without mandatory body param`, (done) => {
        api.put('/suspend')
        .send({
            "student1":"george@digital.com"
        })
        .expect(400, done)
        
        
    });



}); 