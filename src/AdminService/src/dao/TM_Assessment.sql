-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: Academy
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Register`
--

DROP TABLE IF EXISTS `Register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Register` (
  `registerId` varchar(36) NOT NULL,
  `registeredStudentId` varchar(36) NOT NULL,
  `registeredTeacherId` varchar(36) NOT NULL,
  PRIMARY KEY (`registerId`),
  KEY `registeredTeacherId` (`registeredTeacherId`),
  KEY `registeredStudentId` (`registeredStudentId`),
  CONSTRAINT `register_ibfk_1` FOREIGN KEY (`registeredTeacherId`) REFERENCES `teachers` (`teacherid`),
  CONSTRAINT `register_ibfk_2` FOREIGN KEY (`registeredStudentId`) REFERENCES `students` (`studentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Register`
--

LOCK TABLES `Register` WRITE;
/*!40000 ALTER TABLE `Register` DISABLE KEYS */;
INSERT INTO `Register` VALUES ('0f46cb98-340b-41e4-ab83-b4cec35e5d67','2559d1be-c6f2-45a9-aba6-87b048767a9c','e19997af-d8bc-4a89-b5bc-600b54697e3f'),('0fb503e5-ce82-41a1-a5ee-d1f2d66b506b','2559d1be-c6f2-45a9-aba6-87b048767a9c','e19997af-d8bc-4a89-b5bc-600b54697e3f'),('4361f537-71a2-4908-8775-44ae4dfe43b4','88b7d790-42b5-4583-814f-3efc4068d61c','ac8bfb9e-7745-438e-b842-8dacb81396b8'),('62b5e9ff-00bc-4818-90e6-6e0368619323','4e038bb0-7525-421e-bd03-f4f1d2aebdaa','ac8bfb9e-7745-438e-b842-8dacb81396b8'),('6638ab4b-9fdb-4494-b7cc-1039c8f494e5','7092503f-9fc7-46bf-bce2-5b9e5a3da4b8','e19997af-d8bc-4a89-b5bc-600b54697e3f'),('80221917-58ec-40b9-b186-4dcdad29d756','95200a13-1952-460c-b910-3cf48da6498a','c1395870-49b7-43d5-8bda-80cfbd832da3'),('933becda-2507-4496-a668-e13dcf3d455c','2559d1be-c6f2-45a9-aba6-87b048767a9c','ac8bfb9e-7745-438e-b842-8dacb81396b8'),('ccb58e60-c00f-45a9-bfe2-17059c5ad8eb','7092503f-9fc7-46bf-bce2-5b9e5a3da4b8','e19997af-d8bc-4a89-b5bc-600b54697e3f');
/*!40000 ALTER TABLE `Register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `students` (
  `studentId` varchar(36) NOT NULL,
  `studentName` varchar(50) NOT NULL,
  `emailId` varchar(20) NOT NULL,
  `isSuspended` tinyint(1) NOT NULL DEFAULT '0',
  `city` varchar(50) NOT NULL,
  `state` varchar(50) DEFAULT NULL,
  `postalCode` varchar(15) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  PRIMARY KEY (`studentId`),
  UNIQUE KEY `emailId` (`emailId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES ('2559d1be-c6f2-45a9-aba6-87b048767a9c','Agnes','agnes@digital.com',0,'Mumbai','Maharastra','400231','India'),('4e038bb0-7525-421e-bd03-f4f1d2aebdaa','Austin','austin@digital.com',0,'Chennai','TamilNadu','600511','India'),('7092503f-9fc7-46bf-bce2-5b9e5a3da4b8','James','james@digital.com',0,'Mysore','Karnataka','560035','India'),('88b7d790-42b5-4583-814f-3efc4068d61c','Bob','bob@digital.com',0,'Bangalore','Karnataka','560100','India'),('95200a13-1952-460c-b910-3cf48da6498a','George','george@digital.com',1,'Cochin','Kerala','460023','India');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teachers` (
  `teacherId` varchar(36) NOT NULL,
  `teacherName` varchar(50) NOT NULL,
  `emailId` varchar(20) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) DEFAULT NULL,
  `postalCode` varchar(15) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`teacherId`),
  UNIQUE KEY `emailId` (`emailId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` VALUES ('076ef955-5ca9-4553-b2d9-8dbd9a84c877','Jacob','jacob@digital.com','Mumbai','Maharastra','600432','India'),('ac8bfb9e-7745-438e-b842-8dacb81396b8','Susan','susan@digital.com','Mumbai','Maharastra','600432','India'),('c086fe6f-09b6-454d-a908-3c337f894084','Racheal','racheal@digital.com','Bangalore','Karnataka','560035','India'),('c1395870-49b7-43d5-8bda-80cfbd832da3','Nancy','nancy@digital.com','Mumbai','Maharastra','600432','India'),('e19997af-d8bc-4a89-b5bc-600b54697e3f','Philip','philip@digital.com','Bangalore','Karnataka','560035','India');
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-18  8:02:18
