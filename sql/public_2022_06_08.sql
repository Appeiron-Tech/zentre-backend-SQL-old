use minegocio;

DROP TABLE IF EXISTS `client_question_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_question_options` (
  `id` int NOT NULL AUTO_INCREMENT,
  `optionCode` varchar(16) NOT NULL,
  `option` varchar(64) NOT NULL,
  `order` int NOT NULL DEFAULT '0',
  `clientQuestionId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `clientQuestionOption_fk_question` (`clientQuestionId`),
  CONSTRAINT `clientQuestionOption_fk_question` FOREIGN KEY (`clientQuestionId`) REFERENCES `client_questions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_question_options`
--

LOCK TABLES `client_question_options` WRITE;
/*!40000 ALTER TABLE `client_question_options` DISABLE KEYS */;
INSERT INTO `client_question_options` VALUES (1,'businessType0','Restaurante',0,1),(2,'businessType1','Bar',1,1),(3,'businessType2','Servicio para llevar o Food Truck',2,1),(4,'businessType3','Food Truck',3,1),(5,'businessType4','Servicio a domicilio o Cocina en Casa',4,1),(6,'businessType5','Hotel o lugar de arte y eventos',5,1),(7,'businessType6','Market place o Logistica de entrega',6,1),(8,'businessType7','Otro tipo de negocio',7,1),(9,'dairyClients0','1-10',0,3),(10,'dairyClients1','10-25',1,3),(11,'dairyClients2','25-50',2,3),(12,'dairyClients3','50-100',3,3),(13,'dairyClients4','100-250',4,3),(14,'dairyClients5','250-1000',5,3),(15,'typeToSell0','Comida y/o bebidas',0,2),(16,'typeToSell1','Products comestibles',1,2),(17,'typeToSell2','Artículos para mascotas',2,2),(18,'typeToSell3','Fitness wear',3,2),(19,'typeToSell4','Ropa/moda',4,2),(20,'typeToSell5','Artículos para el hogar',5,2),(21,'typeToSell6','Muebles',6,2),(22,'typeToSell7','Arte',7,2),(23,'typeToSell8','Joyería/Bisutería',8,2),(24,'typeToSell9','Servicios',9,2),(25,'typeToSell10','Otros',10,2),(26,'deliveryType0','Un repartidor propio',0,4),(27,'deliveryType1','Un repartidor independiente',1,4),(28,'deliveryType2','Un repartidor de una app de comida',2,4),(29,'deliveryType3','Un repartidor de una empresa especializada',3,4),(30,'createdAt0','1-3 años',0,5),(31,'createdAt1','3-5 años',1,5),(32,'createdAt2','5-10 años',2,5),(33,'createdAt3','10-20 años',3,5),(34,'createdAt4','20 años a más',4,5),(35,'usedApps0','Rappi',0,6),(36,'usedApps1','PedidosYa',1,6),(37,'usedApps2','Chazki',2,6),(38,'usedApps3','Joker',3,6),(39,'usedApps4','Otro',4,6),(40,'usedApps5','Ninguno',5,6);
/*!40000 ALTER TABLE `client_question_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_questions`
--

DROP TABLE IF EXISTS `client_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `questionCode` varchar(16) NOT NULL,
  `question` varchar(64) NOT NULL,
  `type` char(4) NOT NULL DEFAULT 'TXTF',
  `order` int NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_questions`
--

LOCK TABLES `client_questions` WRITE;
/*!40000 ALTER TABLE `client_questions` DISABLE KEYS */;
INSERT INTO `client_questions` VALUES (1,'businessType','tipo de negocio','sele',0,'2022-06-08 22:23:00'),(2,'typeToSell','¿Que vendes?','sele',1,'2022-06-08 22:23:00'),(3,'dairyClients','¿A cuántos clientes atiendes diariamente?','sele',2,'2022-06-08 22:23:00'),(4,'deliveryType','¿Como envías por delivery?','sele',3,'2022-06-08 22:23:00'),(5,'createdAt','¿Hace cuanto comenzó tu negocio?','sele',4,'2022-06-08 22:23:00'),(6,'usedApps','¿Aplicaciones de comidas con las que trabajas?','sele',5,'2022-06-08 22:23:00');
/*!40000 ALTER TABLE `client_questions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-08 18:30:30
