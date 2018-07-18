# TeacherAdminServices
It will include the API or MicroServices used by any Institute Teacher as Administrator



Specs of the Codebase:
1) ES6 code
2) Modularity
3) Linting (eslint, jshint)
4) pm2 config
5) Test cases in mocha chai




Database Config:
1) You can get the schema i used from  /src/AdminService/src/dao/TM_Assessment.sql
2) import the sql file in your local mysql DB
3) create a user "admin"@"localhost" and password as "adminPass" ----> mysql -u admin -p adminPass
4) Local DB will be ready and up.


NOTE: Incase if you already have a user and password, 
Change the credentials accordingly in TeacherAdminServices/src/configuration-utility/config_values/dbConnectionConfig.js





Steps to run the Application:
1) Install pm2 in your system -------> npm install -g pm2
2) Perform npm install on :
           TeacherAdminServices/src/AdminService/src/
           TeacherAdminServices/src/common-utility/src/
           TeacherAdminServices/src/mysql-connector/src/
           TeacherAdminServices/test/ (For Test Cases)
 
3) Boot the Application by : 

   ---> Go to TeacherAdminServices/src/AdminService/src/
   
   ---> RUN command--->  "pm2 start pm2-config.json --env development"





Please see the postman collection : https://www.getpostman.com/collections/a8d327bfde2a36fcac8a


EmailID : shijiththomas2@gmail.com
