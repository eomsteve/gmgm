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
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `news_id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(300) NOT NULL,
  `link` varchar(600) NOT NULL,
  `pub_date` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`news_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9804 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (9784,'[기고] 밥상 흔드는 식량 위기, 간척지서 답을 찾다','https://n.news.naver.com/mnews/article/022/0003741723?sid=110','2022-10-06 23:54:00'),(9785,'미국 뉴욕증시, 실업 지표 부진 속에 하락 출발…SP 0.63%↓·나스닥 0.53%↓...','http://www.topstarnews.net/news/articleView.html?idxno=14753070','2022-10-06 23:46:00'),(9786,'뉴욕증시, 실업 지표 부진 속에 하락 출발','https://n.news.naver.com/mnews/article/001/0013488275?sid=101','2022-10-06 23:34:00'),(9787,'美 신규 실업수당 청구, 예상 웃돈 21.9만건…5주 만에 최고치','https://n.news.naver.com/mnews/article/421/0006378996?sid=104','2022-10-06 23:24:00'),(9788,'울산항만공사 계약규정 새로 마련','http://www.iusm.co.kr/news/articleView.html?idxno=959409','2022-10-06 23:22:00'),(9789,'[미 나스닥 선물] 美 민간 고용지표 발표에도 반등... 0.57%↑','https://www.sisamagazine.co.kr/news/articleView.html?idxno=468183','2022-10-06 23:12:00'),(9790,'다음 주 한은 기준금리 결정...빅스텝 단행할까?','https://n.news.naver.com/mnews/article/023/0003720443?sid=101','2022-10-06 23:01:00'),(9791,'대만 9월 인플레이션 전년비 2.75% 상승','https://n.news.naver.com/mnews/article/215/0001058428?sid=101','2022-10-06 22:58:00'),(9792,'ECB 의사록 인플레 고착화 될 수 있어, 성장 둔화에도 공격적 긴축 필요','http://www.newspim.com/news/view/20221006001338','2022-10-06 22:57:00'),(9793,'라이나생명, ‘(무)라이나다이렉트암보험(갱신형)’ 보험료 인하','http://www.insnews.co.kr/design_php/news_view.php?num=71475&firstsec=1&secondsec=12','2022-10-06 22:54:00'),(9794,'[뉴욕개장] 인플레 우려 속 美 3대 증시, 이틀 연속 하락 출발','https://n.news.naver.com/mnews/article/421/0006378982?sid=104','2022-10-06 22:49:00'),(9795,'미국, 주간 실업수당 청구 2만9천 건 증가','https://n.news.naver.com/mnews/article/055/0001004362?sid=104','2022-10-06 22:48:00'),(9796,'울산항만공사, 공정거래 강화 계약규정 마련','http://www.ujeil.com/news/articleView.html?idxno=313690','2022-10-06 22:34:00'),(9797,'[생활경제 이슈] 이차돌, 부산 지역 매장 차돌박이 할인 프로모션 진행 外','http://www.lawissue.co.kr/view.php?ud=202210062228043852204ead0791_12','2022-10-06 22:30:00'),(9798,'광명시, 2023년도 생활임금 ‘1만 930원’으로 결정','https://n.news.naver.com/mnews/article/119/0002646010?sid=103','2022-10-06 22:25:00'),(9799,'美노동시장 진정되나…주간 실업수당 청구 2만9천건 증가','https://n.news.naver.com/mnews/article/001/0013488238?sid=104','2022-10-06 22:21:00'),(9800,'[미국 뉴욕증시] 다우 나스닥 선물 하락세 고용지표에 국채금리↑','https://www.gukjenews.com/news/articleView.html?idxno=2566460','2022-10-06 22:18:00'),(9801,'강화섬쌀 인기몰이라지만... 쌀 값 폭락으로 농가는 시름','https://ilyo.co.kr/?ac=article_view&entry_id=438092','2022-10-06 22:12:00'),(9802,'덜먹고·안 입고·안 놀고…소비절벽 시대','http://www.kyongbuk.co.kr/news/articleView.html?idxno=2113783','2022-10-06 22:06:00'),(9803,'안동 임하면 새마을부녀회 ‘생필품 나눔’','http://www.ksmnews.co.kr/default/index_view_page.php?idx=397152&part_idx=289','2022-10-06 22:06:00');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
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
