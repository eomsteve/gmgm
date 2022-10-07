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
-- Table structure for table `checklist_custom_item`
--

DROP TABLE IF EXISTS `checklist_custom_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checklist_custom_item` (
  `checklist_custom_item_id` bigint NOT NULL AUTO_INCREMENT,
  `checklist_id` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`checklist_custom_item_id`),
  KEY `FKanwu6brjiuu5plitct5ib894u` (`checklist_id`),
  CONSTRAINT `FKanwu6brjiuu5plitct5ib894u` FOREIGN KEY (`checklist_id`) REFERENCES `checklist` (`checklist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=132175 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checklist_custom_item`
--

LOCK TABLES `checklist_custom_item` WRITE;
/*!40000 ALTER TABLE `checklist_custom_item` DISABLE KEYS */;
INSERT INTO `checklist_custom_item` VALUES (131953,131598,'커스텀 품목1',_binary '\0'),(132054,131603,'huysck',_binary ''),(132058,131608,'와 이게 되는구나!',_binary '\0'),(132059,131598,'커스텀 품목2',_binary ''),(132060,131598,'커스텀 품목3',_binary '\0'),(132061,131611,'와이게 되는구나',_binary '\0'),(132063,131611,'오',_binary '\0'),(132064,131611,'오..',_binary '\0'),(132066,131613,'우와..',_binary ''),(132067,131600,'fewfwaefwef',_binary ''),(132068,131599,'fewfwfwef',_binary '\0'),(132069,131615,'스티브',_binary '\0'),(132070,131615,'엄',_binary '\0'),(132071,131615,'바',_binary '\0'),(132072,131615,'보',_binary '\0'),(132073,131604,'메모장?',_binary '\0'),(132074,131602,'오징어는 스플래툰..',_binary '\0'),(132075,131617,'어.. 이가 없네',_binary '\0'),(132076,131615,'아닌데',_binary ''),(132077,131622,'짱이다',_binary ''),(132078,131652,'뭐 사야 하더라..',_binary '\0'),(132079,131652,'기대된다 MT!',_binary '\0'),(132080,131650,'자일리톨 캔디 크리스탈 레몬',_binary '\0'),(132081,131650,'콜록콜록',_binary '\0'),(132082,131653,'자일리톨 캔디 크리스탈 레몬',_binary '\0'),(132083,131653,'버그리포트..',_binary '\0'),(132085,131656,'나 조금 졸린걸지도',_binary ''),(132086,131659,'커스텀1',_binary '\0'),(132087,131659,'커스텀2',_binary '\0'),(132088,131660,'indices',_binary '\0'),(132089,131660,'indexes',_binary '\0'),(132090,131660,'indexs',_binary '\0'),(132091,131676,'asdf',_binary '\0'),(132092,131692,'우와',_binary '\0'),(132093,131692,'짱이다~',_binary '\0'),(132094,131694,'바보',_binary ''),(132095,131701,'8팀 짱',_binary '\0'),(132096,131701,'신기합니다',_binary '\0'),(132097,131694,'오',_binary '\0'),(132098,131694,'오래오',_binary '\0'),(132099,131704,'안녕 하세요',_binary '\0'),(132100,131704,'감자가먹고 싶어요',_binary '\0'),(132101,131716,'ㅁㅁㅁ',_binary '\0'),(132102,131720,'식기',_binary '\0'),(132103,131720,'프라이팬',_binary '\0'),(132104,131722,'식기',_binary '\0'),(132105,131722,'프라이팬',_binary '\0'),(132106,131740,'123123',_binary '\0'),(132107,131741,'^^7',_binary '\0'),(132108,131744,'1231421',_binary '\0'),(132109,131744,'afafsd',_binary '\0'),(132110,131745,'123',_binary '\0'),(132111,131719,'ㅁㅁㅁ',_binary '\0'),(132113,131750,'41242',_binary ''),(132114,131751,'음.. input 시 포커스 필요할듯',_binary '\0'),(132115,131702,'꿱',_binary ''),(132116,131754,'니너냐어',_binary '\0'),(132117,131755,'니냐니요',_binary '\0'),(132119,131705,'숟가락',_binary '\0'),(132120,131705,'일회용 종이컵',_binary '\0'),(132121,131760,'오이오잉',_binary '\0'),(132122,131761,'일회용 젓가락',_binary '\0'),(132123,131761,'슬리퍼',_binary '\0'),(132126,131762,'고등어 김구이 맛김',_binary '\0'),(132132,131764,'일회용 종이컵',_binary '\0'),(132133,131764,'슬리퍼',_binary '\0'),(132134,131719,'ㅇㅇㅇ',_binary '\0'),(132135,131782,'ㅇㅇㅇㅇ',_binary '\0'),(132136,131785,'건전지',_binary ''),(132137,131796,'발렌타인21년산',_binary '\0'),(132138,131796,'통큰치킨',_binary '\0'),(132139,131795,'발렌타인21년산',_binary '\0'),(132140,131795,'통큰치킨',_binary '\0'),(132141,131806,'123',_binary '\0'),(132142,131708,'d오잉오잉',_binary '\0'),(132145,131808,'난',_binary '\0'),(132146,131808,'인도쌀',_binary '\0'),(132147,131674,'오늘은 정말 잘수 있어',_binary '\0'),(132148,131727,'타이레놀',_binary '\0'),(132150,131843,'dfdf',_binary '\0'),(132151,131860,'3123',_binary '\0'),(132152,131654,'2323',_binary '\0'),(132153,131885,'ㄹㄷㅁㄻㅈ도려',_binary '\0'),(132154,131920,'식기',_binary '\0'),(132155,131920,'프라이팬',_binary '\0'),(132156,131922,'식기',_binary '\0'),(132157,131923,'식기',_binary '\0'),(132158,131924,'식기',_binary '\0'),(132159,131925,'식기',_binary '\0'),(132160,131927,'와이퍼',_binary '\0'),(132161,131928,'식기',_binary ''),(132162,131929,'도마',_binary '\0'),(132163,131933,'김치',_binary ''),(132164,131933,'참치',_binary ''),(132165,131933,'삼치',_binary '\0'),(132166,131933,'꽁치',_binary '\0'),(132167,131933,'쥐치',_binary '\0'),(132169,131934,'커스텀 아이템도 이게 길어지면 수정 페이지에서는 잘 보이는데 목록에서는 끊기네요ㅠ',_binary '\0'),(132170,131930,'진짜 진짜 긴 사용자의 체크리스트를 생성해 보겠습니다 사실 8글자 이상이어도 보여야 하긴하잔하요',_binary '\0'),(132171,131936,'일회용 젓가락',_binary ''),(132172,131936,'종이컵',_binary '\0'),(132173,131938,'텀블러',_binary '\0'),(132174,131939,'텀블러',_binary '\0');
/*!40000 ALTER TABLE `checklist_custom_item` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07  0:04:00
