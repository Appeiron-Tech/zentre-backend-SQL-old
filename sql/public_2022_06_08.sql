use minegocio;
DROP TABLE IF EXISTS `client_questions`;
CREATE TABLE `client_questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `questionCode` varchar(16) NOT NULL,
  `question` varchar(64) NOT NULL,
  `type` char(4) NOT NULL DEFAULT ''TXTF'',
  `order` int NOT NULL DEFAULT ''0'',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)

DROP TABLE IF EXISTS `client_question_options`;
CREATE TABLE `client_question_options` (
  `id` int NOT NULL AUTO_INCREMENT,
  `optionCode` varchar(16) NOT NULL,
  `option` varchar(64) NOT NULL,
  `order` int NOT NULL DEFAULT ''0'',
  `clientQuestionId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `clientQuestionOption_fk_question` (`clientQuestionId`),
  CONSTRAINT `clientQuestionOption_fk_question` FOREIGN KEY (`clientQuestionId`) REFERENCES `client_questions` (`id`)
)