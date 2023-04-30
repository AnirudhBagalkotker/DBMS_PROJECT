-- MariaDB dump 10.19  Distrib 10.11.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: PRA
-- ------------------------------------------------------
-- Server version	10.11.2-MariaDB

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
-- Table structure for table `ADDRESS`
--

DROP TABLE IF EXISTS `ADDRESS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ADDRESS` (
  `AID` int(11) NOT NULL AUTO_INCREMENT,
  `Door` varchar(40) NOT NULL,
  `Street` varchar(100) NOT NULL,
  `city` varchar(50) NOT NULL,
  `pin` int(6) NOT NULL,
  `state` varchar(50) NOT NULL,
  PRIMARY KEY (`AID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ADDRESS`
--

LOCK TABLES `ADDRESS` WRITE;
/*!40000 ALTER TABLE `ADDRESS` DISABLE KEYS */;
INSERT INTO `ADDRESS` VALUES
(1,'203','abc street','xyz city',123456,'Ohio'),
(2,'egdfihu','VK Bhavan','Hyderabad',500078,'Telengana');
/*!40000 ALTER TABLE `ADDRESS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PHONE`
--

DROP TABLE IF EXISTS `PHONE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PHONE` (
  `Phone` int(11) NOT NULL,
  `UID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PHONE`
--

LOCK TABLES `PHONE` WRITE;
/*!40000 ALTER TABLE `PHONE` DISABLE KEYS */;
INSERT INTO `PHONE` VALUES
(1234567890,1);
/*!40000 ALTER TABLE `PHONE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PROPERTY`
--

DROP TABLE IF EXISTS `PROPERTY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROPERTY` (
  `PID` int(11) NOT NULL AUTO_INCREMENT,
  `Owner_UID` int(11) NOT NULL,
  `Available` int(11) NOT NULL,
  `facilities` varchar(150) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `rent` int(11) NOT NULL,
  `hike` int(11) NOT NULL,
  `area` int(11) NOT NULL,
  `plinth` float NOT NULL,
  `construction` int(11) NOT NULL,
  `floors` int(11) NOT NULL,
  `Type` int(11) NOT NULL,
  `bhk` int(11) DEFAULT NULL,
  `Address` int(11) NOT NULL,
  PRIMARY KEY (`PID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PROPERTY`
--

LOCK TABLES `PROPERTY` WRITE;
/*!40000 ALTER TABLE `PROPERTY` DISABLE KEYS */;
INSERT INTO `PROPERTY` VALUES
(1,1,1,'afed','2023-10-16','2023-11-23',200,5,123,124,1,3,0,4,1);
/*!40000 ALTER TABLE `PROPERTY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RENT`
--

DROP TABLE IF EXISTS `RENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RENT` (
  `RID` int(11) NOT NULL AUTO_INCREMENT,
  `Tenant` int(11) NOT NULL,
  `Property` int(11) NOT NULL,
  PRIMARY KEY (`RID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RENT`
--

LOCK TABLES `RENT` WRITE;
/*!40000 ALTER TABLE `RENT` DISABLE KEYS */;
/*!40000 ALTER TABLE `RENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RENT_HISTORY`
--

DROP TABLE IF EXISTS `RENT_HISTORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RENT_HISTORY` (
  `RID` int(11) NOT NULL,
  `Start_date` date NOT NULL,
  `End_date` date NOT NULL,
  `rent` int(11) NOT NULL,
  `Hike` int(11) NOT NULL,
  `Commission` int(11) NOT NULL,
  PRIMARY KEY (`RID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RENT_HISTORY`
--

LOCK TABLES `RENT_HISTORY` WRITE;
/*!40000 ALTER TABLE `RENT_HISTORY` DISABLE KEYS */;
/*!40000 ALTER TABLE `RENT_HISTORY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ROLE`
--

DROP TABLE IF EXISTS `ROLE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ROLE` (
  `RoleId` int(11) NOT NULL,
  `RoleName` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`RoleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ROLE`
--

LOCK TABLES `ROLE` WRITE;
/*!40000 ALTER TABLE `ROLE` DISABLE KEYS */;
INSERT INTO `ROLE` VALUES
(0,'DBA'),
(1,'MANAGER'),
(2,'OWNER'),
(3,'TENANT');
/*!40000 ALTER TABLE `ROLE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER` (
  `UID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `password` varchar(60) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `address` int(11) DEFAULT NULL,
  `role` int(11) NOT NULL,
  `aadhar` bigint(12) DEFAULT NULL,
  PRIMARY KEY (`UID`),
  KEY `role` (`role`),
  CONSTRAINT `USER_ibfk_1` FOREIGN KEY (`role`) REFERENCES `ROLE` (`RoleId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
INSERT INTO `USER` VALUES
(1,'DBA','root',4,1,0,123456789012);
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'PRA'
--

--
-- Dumping routines for database 'PRA'
--
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_address` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_address`(
    IN p_door VARCHAR(40),
    IN p_street VARCHAR(100),
    IN p_city VARCHAR(50),
    IN p_pin INT(6),
    IN p_state VARCHAR(50)
)
BEGIN
    INSERT INTO USER (door, street, city, pin, state) 
    VALUES (p_door, p_street, p_city, p_pin, p_state);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_user`(
    IN p_name VARCHAR(100),
    IN p_password VARCHAR(60),
    IN p_aadhar BIGINT(12),
    IN p_age INT,
    IN p_address_id INT,
    IN p_role INT
)
BEGIN
    INSERT INTO USER (name, password, aadhar, age, address, role) 
    VALUES (p_name, p_password, p_aadhar, p_age, p_address_id, p_role);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-30 16:36:35
