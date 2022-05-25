-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: minegocio
-- ------------------------------------------------------
-- Server version	8.0.28


DROP TABLE IF EXISTS `themes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `themes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `theme` varchar(32) NOT NULL,
  `brightness` varchar(16) DEFAULT NULL,
  `primary` char(6) DEFAULT NULL,
  `onPrimary` char(6) DEFAULT NULL,
  `secondary` char(6) DEFAULT NULL,
  `onsecondary` char(6) DEFAULT NULL,
  `error` char(6) DEFAULT NULL,
  `onError` char(6) DEFAULT NULL,
  `background` char(6) DEFAULT NULL,
  `onBackground` char(6) DEFAULT NULL,
  `surface` char(6) DEFAULT NULL,
  `onSurface` char(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_theme` (`theme`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `themes`
--

LOCK TABLES `themes` WRITE;
/*!40000 ALTER TABLE `themes` DISABLE KEYS */;
INSERT INTO `themes` VALUES (1,'cyan-light','light','90caf9','42a5f5','ce93d8','ab47bc','f44336','d32f2f','e3f2fd','f3e5f5','f6f6f6','a6a6a6');
/*!40000 ALTER TABLE `themes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;



-- Dump completed on 2022-05-24 11:22:57
