-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: shop
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `goods`
--

DROP TABLE IF EXISTS `goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `cost` double NOT NULL,
  `image` varchar(500) NOT NULL,
  `category` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods`
--

LOCK TABLES `goods` WRITE;
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
INSERT INTO `goods` VALUES (1,'Asus ROG Strix G15 G512LI-HN094','Экран 15.6\" IPS (1920x1080) Full HD 144 Гц, матовый / Intel Core i5-10300H (2.5 - 4.5 ГГц) / RAM 8 ГБ / SSD 512 ГБ / nVidia GeForce GTX 1650 Ti, 4 ГБ / без ОД / LAN / Wi-Fi / Bluetooth / без ОС / 2.39 кг / черный',26555,'asus_rog_strix.jpg',1),(2,'HP Notebook 15s-eq0006ua','Экран 15.6” IPS (1920x1080) Full HD, матовый / AMD Ryzen 5 3500U (2.1 - 3.7 ГГц) / RAM 16 ГБ / SSD 512 ГБ / Radeon Vega 8 Graphics / без ОД / Wi-Fi / Bluetooth / веб-камера / DOS / 1.74 кг / серебристый',18449,'HP_Notebook.jpg',1),(3,'MSI GP75-10SEK Leopard','Экран 17.3\" IPS (1920x1080) Full HD 144 Гц, матовый / Intel Core i7-10750H (2.6 - 5.0 ГГц) / RAM 16 ГБ / SSD 512 ГБ / nVidia GeForce RTX 2060, 6 ГБ / без ОД / LAN / Wi-Fi / Bluetooth / веб-камера / DOS / 2.6 кг / черный',47777.15,'msi_gp7510sek.jpg',1),(4,'Samsung Galaxy Tab S6 Lite','Экран 10.4\" 2000x1200, матовый / RAM 4 ГБ / SSD 64ГБ /  / LAN / Wi-Fi / Bluetooth / веб-камера / Android / 0.465 кг / черный',10499,'samsung_tab.jpg',2),(5,'Xiaomi Redmi Note 9S','Экран 6.67\" 2400x1080, матовый IPS/ RAM 4 ГБ / 64ГБ /  / LAN / Wi-Fi / Bluetooth / веб-камера / Android / 0.209 кг / черный',5999,'xiaomi_redmi_note_9_pro_4_64gb.jpg',3),(18,'Apple iPhone 12 mini 64 GB White','Діагональ екрана 5.4; Роздільна здатність відео 2340 x 1080; Кількість СІМ-карток 2 ; Вбудована пам\'ять 64 ГБ',26999,'apple_iphone_12_mini_64gb_white.jpg',3);
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-20 22:01:11
