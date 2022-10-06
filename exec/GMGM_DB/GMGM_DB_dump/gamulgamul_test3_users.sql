-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: j7d108.p.ssafy.io    Database: gamulgamul_test3
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(100) DEFAULT NULL,
  `pwd` varchar(100) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `gender` char(1) NOT NULL,
  `birthday` date NOT NULL,
  `role` char(1) NOT NULL,
  `is_deleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=131633 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (129242,'email1@xx.xx','$2a$10$OzNmk6/WR7LqJFLoTuq/t.R.NWbFFYn2xh4q.4Q7YW5HRLHZb5gAe','name1','m','1991-01-01','u',_binary '\0'),(129243,'email2@xx.xx','$2a$10$6kTh2b3SW9bv4R5j9h68eOSFu6huDKv0Y0CK3fdEEF6bFt3vBufaa','name2','m','1992-01-01','u',_binary '\0'),(129244,'email3@xx.xx','$2a$10$ZubRV5tRWUw.FM9WLsEtyOuZgUO3TK9LrkB56qUBmJ0BlGAaT0Tj2','name3','m','1993-01-01','u',_binary '\0'),(129245,'email4@xx.xx','$2a$10$HvhMwRhjPjqKsz1Noq/Rw.QTlX6NiixRzfKIJvxJ/Ge3JeQxYnXeu','name4','m','1994-01-01','u',_binary '\0'),(129246,'email5@xx.xx','$2a$10$tDrapLh8B.ByMPHnJ.FWl.k6p6Clj4.8KOAvdlFAP5JJwj0Gm0Wti','name5','m','1995-01-01','u',_binary '\0'),(129247,'email6@xx.xx','$2a$10$jZlelvWYUPHzXD2eqOE0zO6wbTbZuRtbXmbJZRoIWWTo5GxzTxLJW','name6','m','1996-01-01','u',_binary '\0'),(129248,'email7@xx.xx','$2a$10$LCQhLZKxz2NwSWvnAsLMeenmw0JBfCI5uWOzAECV2a..YnW2agj7K','name7','m','1997-01-01','u',_binary '\0'),(129249,'email8@xx.xx','$2a$10$GuVn1ntWlJtnFe86ENR9UONjSRh9j/OKAmql59qxoJioQKusq58NS','name8','m','1998-01-01','u',_binary '\0'),(129250,'email9@xx.xx','$2a$10$xy/wBSP.QPQT.a73fy9FHugTguUjE6TDkOTgZLdEA6rxeb3Au15hi','name9','m','1999-01-01','u',_binary '\0'),(131591,'1217jdk@naver.com','$2a$10$l/kvNpqWa5KBkGWh1yDSU.5bR6sLSC9wcBbdUIIkOfVI/b/F3V7uu','1217jdk','m','1998-12-17','u',_binary '\0'),(131592,'1217jdk@gmail.com','$2a$10$V4cYHFbuhzwxfGJlN/I7aeFDN6CbJAog0dUStdXFdsp0qXHQjs7FO','1217jdk','m','1998-12-17','u',_binary '\0'),(131593,'1217jdk@xx.xx','$2a$10$9Z.bb2.vnfGUuej8ISqQtuy3TiX54K.DAGzhtxNu0AlOAx5aJWSu6','1217jdk','m','1998-12-17','u',_binary '\0'),(131594,'1217jdk@xxx.xxx','$2a$10$eL.b.CeXN4WFiIbN534ToOnw9D54L8.1NdDUgAmiEMzr9WdgFJxWK','1217jdk','m','1998-12-17','u',_binary '\0'),(131595,'sheom@email.com','$2a$10$E4O1znxmMHpnd1KvIMansOVSZqZgQws1yizpLyCUU9kIB3aSclJzK','user','m','1999-01-01','u',_binary '\0'),(131603,'valid1@xx.xx','$2a$10$It77m45h0T7y2F3beMNcMuAvW1moDBR5oAVL6O84DTfjO6AimAH5S','name1','m','1980-01-01','u',_binary '\0'),(131604,'valid2@xx.xx','$2a$10$u/5FoujvzVgkaLl9XoxeN.ifRFtyPI8r4wv9AVk/Dqz4aGT1N0uWS','name2','m','1980-01-01','u',_binary '\0'),(131605,'email123@xx.xx','$2a$10$8mpYC/mpLLQYt9hzEgsQF.CPJ8VY1ViHN36QmBhg4xmCHccsHu6ga','12312','m','1995-08-07','u',_binary '\0'),(131606,'email123@xx.xx','$2a$10$UsCQ8kA2JTPia7L8a8KJQ.PAz13gpjfTIpxzLK0FRwDptXMvkUYoK','12312','m','1995-08-07','u',_binary '\0'),(131607,'email123@xx.xx','$2a$10$7FX.JjPSn2XkASrGoVmAGuUE31/WwQOnfKmO/Zgg4kc82c4SM.D82','eom','m','1995-08-07','u',_binary '\0'),(131608,'email001@xx.xx','$2a$10$JRGcOJrxxNwlJoJaIvOpFutIhNZ3EJIPga85H7pwasnrlDNYCh.M2','안녕','f','1995-08-07','u',_binary '\0'),(131609,'email002@xx.xx','$2a$10$DWgkPpnixh2HIwzLPwqEtOau7rOdJNX6OO5NXUlzX9QbeE25QGZJ2','안녕','f','1995-08-07','u',_binary '\0'),(131610,'email002@xx.xx','$2a$10$6pOi7QoN4s1cWf06RMqMWeK.1nzNpSyumoos1pydcaTbDJQ5VZKvC','안녕','f','1995-08-07','u',_binary '\0'),(131611,'email222@xx.xx','$2a$10$Wf6C3h/G29r7aTiFWXBDC.HGLACbeCIvwMHGzl/G6O6h8xsWzfnxO','cosmo','m','1995-05-04','u',_binary '\0'),(131612,'email222@xx.xx','$2a$10$cufw4G9MwHvSmNqusFg4GOiTJ6UN0wgCi.IQGX8jSKEaetbN14OfS','cosmo','m','1995-05-04','u',_binary '\0'),(131613,'email222@xx.xx','$2a$10$L9eHISrhqN/N5DTHI4Gx3.Ur2UcvyGapuF.ENgTIbCcfzWyjEyMwW','cosmo','m','1995-05-04','u',_binary '\0'),(131614,'email222@xx.xx','$2a$10$IHUi1FqCOH8UF3nu6qAVoOxeVIbuuCDInlzPz9WIiBHC9jfPlXx9y','cosmo','m','1995-05-04','u',_binary '\0'),(131615,'email222@xx.xx','$2a$10$ceOggpZkOE65FROZCHI.MOsXtDUd8b85Y1vyh6MGjac2dPZPpcHtG','cosmo','m','1995-05-04','u',_binary '\0'),(131616,'email22@xx.xx','$2a$10$JKYK.QBy3su0KQi62/4w8eXCy.sfvGBYdGRl.1wnz/BNE6sapb5ea','cosmo234','m','1995-05-04','u',_binary '\0'),(131617,'email333@xx.xx','$2a$10$BtUEGbBDkheAyB7fDmUAbegdSEMor7haLnOvac6AyUBbmw/rT/f8i','김효은','f','2022-10-01','u',_binary '\0'),(131618,'email666@xx.xx','$2a$10$NcetBV6MfbAFwakT5yrewOPUGDsyLT0qU1/cMY9DDYxjBM95CRnAu','backend','m','1994-04-04','u',_binary '\0'),(131619,'isy5111@naver.com','$2a$10$FDZl6zuSp5Ka0A9uBqLyIOiKpbSkxmIaiYhzqIBciXVsA.5IGRybq','ㅇㅅㅇ','f','1999-11-15','u',_binary '\0'),(131620,'nktion@naver.com','$2a$10$bO46kQfC76Px0KTH/Y.WNOkwx.7kEaYLRLw/1klcwCfc104cigMre','Kim','f','2022-10-01','u',_binary '\0'),(131621,'1217jdk@xx.xxx','$2a$10$L9cH2ub4DpllEwv/23g1gem4ik9NZ5Pm85OAk4oDk/wPJDAE96leK','정동규','m','2022-10-03','u',_binary '\0'),(131622,'jisy2718@gmail.com','$2a$10$SrYI39WmvBVHZuvaLEPVX.VnqGxLrZRHQysBF5A6f.Ki5bMay6BZ.','지승영','m','2021-05-10','u',_binary '\0'),(131623,'socialble97@naver.com','$2a$10$LAbEeadl7xo0lVMq6OSbi.Xds4Ms8SdLVqOYpP0AP59CqJsXElvJi','이동욱','m','1997-05-02','u',_binary '\0'),(131624,'mstkang@gmail.com','$2a$10$J7bQs5Nd4mxv446hO2cifuEknYC7dCoYpSV/zVUPgLPPMGwqGcR.u','강컨','m','1977-11-06','u',_binary '\0'),(131625,'siryeongchoi@ssafy.com','$2a$10$Ox62O0oJavDr7iznh5zggOWCHhunCGkipNV6ocRcCBdcHnJltGbHK','놀러왔어요','m','2022-10-04','u',_binary '\0'),(131626,'test0@xx.xx','$2a$10$SQc3vHjbUqyHUZ3v4mKiPuitPYksalZsjen51eNQZKFNHUCpUK55C','name0','m','1980-01-01','u',_binary '\0'),(131627,'ssafy@ssafy.com','$2a$10$m9dJb14/wfywwFUEDcTM5eIKfWDqzxIayxyhjjNmeqERVABbi9Gl.','레몬물','f','1999-01-01','u',_binary '\0'),(131628,'ex1@xx.xx','$2a$10$rSbi3XTVz2RjYdR/ekDNyexQTsW/GAsirTam1cp267DlrM/kYQKnO','임싸피','f','1999-11-15','u',_binary '\0'),(131629,'abc123@naver.com','$2a$10$ez8nl0okq6XESSqp7ySMieldbPlb1kdh6HndhpzizY.whkdwA/evy','정종혁','m','1974-10-01','u',_binary '\0'),(131630,'example@ssafy.com','$2a$10$0l.vatgzhaeesuvWHP7y.e8xZ8peOZb9cTMI1y9YZXenPZb5BS7h.','김싸피','m','2022-10-05','u',_binary '\0'),(131631,'ssafy_d108@ssafy.com','$2a$10$q54DhzQIZV62oMuynmPR2eGSnlrut4qTJdQVN9eCVCypUnY2RdTbK','김싸피','m','2000-01-01','u',_binary '\0'),(131632,'kimssafy@ssafy.com','$2a$10$iZY8DM1QDx8hzP0H1rFal.bAkkYmtSuAhAB1Fyk7A74jc.7qpcGCS','김싸피','m','2022-10-06','u',_binary '\0');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07  0:03:57
