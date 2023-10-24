CREATE DATABASE  IF NOT EXISTS `ops` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ops`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: ops
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `budget` decimal(10,2) NOT NULL,
  `skills` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `deadline` date NOT NULL,
  `created_at` date NOT NULL,
  `id_user` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (1,'Desenvolvimento de Website Corporativo','Procuramos um talentoso desenvolvedor web para criar um website corporativo de alto impacto. Se você é apaixonado por HTML, CSS e JavaScript, junte-se a nós nessa jornada de transformação digital. Trabalhe de qualquer lugar e ajude a construir a presença online da nossa empresa.',1000.00,'Domínio em desenvolvimento web, HTML5, CSS3, JavaScript. Experiência em criação de sites corporativos responsivos e dinâmicos.','Remoto','2023-10-15','2023-08-28',1,NULL),(2,'Criação de Logotipo para Startup','Nossa startup está em busca de um talentoso designer gráfico para criar o logotipo que representará nossa visão inovadora. Se você é mestre no Adobe Illustrator e tem um olhar criativo, junte-se a nós e deixe sua marca na nossa história.',300.00,'Experiência em design gráfico, Adobe Illustrator, criação de logotipos. Habilidades avançadas em software de design.','Remoto','2023-09-30','2023-05-29',2,NULL),(3,'Redação de Artigos sobre Tecnologia','Estamos à procura de redatores apaixonados por tecnologia e pesquisa. Se você adora escrever sobre as últimas tendências tecnológicas e tem habilidades de pesquisa afiadas, venha se juntar à nossa equipe remota e compartilhe seu conhecimento com o mundo.',50.00,'Excelentes habilidades de redação técnica, pesquisa de tecnologia. Conhecimento sólido em tópicos de tecnologia e tendências.','Remoto','2023-09-30','2023-07-30',2,NULL),(4,'Tradução de Documento Empresarial','Nossa empresa precisa de um tradutor experiente para transformar documentos empresariais em diferentes idiomas. Se você é fluente em inglês e espanhol, e é meticuloso com os detalhes, venha fazer parte da nossa equipe e ajude-nos a expandir globalmente.',150.00,'Fluência em inglês e espanhol, tradução técnica. Experiência em tradução de documentos empresariais e terminologia técnica.','Remoto','2023-09-20','2023-07-31',1,NULL),(5,'Edição de Vídeo Promocional','Estamos à procura de um editor de vídeo talentoso para transformar nossas ideias em vídeos promocionais cativantes. Se você domina o Adobe Premiere Pro e tem um olhar aguçado para narrativas visuais, junte-se a nós e crie vídeos que impressionarão nosso público.',200.00,'Edição de vídeo profissional, Adobe Premiere Pro. Habilidades avançadas em edição de vídeo e narrativa visual.','Remoto','2023-10-10','2023-06-01',3,NULL),(11,'Desenvolvimento de Aplicativo Móvel','Estamos à procura de um desenvolvedor de aplicativos móveis para criar um aplicativo incrível que transformará a experiência dos nossos clientes. Se você é especializado em desenvolvimento iOS ou Android e tem paixão por criar aplicativos inovadores, junte-se à nossa equipe.',2000.00,'Desenvolvimento iOS/Android, Swift, Kotlin, Interface de usuário móvel','Remoto','2023-09-25','2023-08-15',2,NULL),(12,'Design de Interface de Usuário','Procuramos um designer de UI/UX talentoso para criar interfaces de usuário atraentes e funcionais para nossos produtos. Se você é criativo, possui um olhar apurado para o design e entende os princípios de experiência do usuário, venha nos ajudar a tornar nossos produtos incríveis.',800.00,'Design de Interface de Usuário, UI/UX, Adobe XD, Sketch','Remoto','2023-09-30','2023-08-20',3,NULL),(13,'Suporte Técnico em TI','Nossa equipe de TI está buscando um especialista em suporte técnico para resolver problemas e oferecer suporte eficaz aos nossos usuários. Se você tem experiência em suporte técnico, é paciente e possui excelentes habilidades de comunicação, inscreva-se agora!',1200.00,'Suporte Técnico, Windows, Linux, Redes, Atendimento ao Cliente','Remoto','2023-09-28','2023-08-10',1,NULL),(14,'Marketing de Mídia Social','Procuramos um especialista em marketing de mídia social para gerenciar nossas campanhas nas redes sociais. Se você é criativo, compreende as tendências de marketing digital e pode aumentar nossa presença online, junte-se à nossa equipe.',600.00,'Marketing de Mídia Social, Gerenciamento de Redes Sociais, Estratégias de Engajamento, Publicidade Digital','Remoto','2023-09-27','2023-08-05',1,NULL),(15,'Desenvolvimento de Jogos','Estamos em busca de um desenvolvedor de jogos apaixonado para criar experiências de jogo emocionantes. Se você é experiente em desenvolvimento de jogos, Unity ou Unreal Engine, e tem uma paixão por jogos, candidate-se e ajude-nos a criar os próximos jogos de sucesso!',2500.00,'Desenvolvimento de Jogos, Unity, Unreal Engine, Design de Jogos, Programação de Jogos','Remoto','2023-10-05','2023-08-25',3,NULL),(16,'Desenvolvimento de Aplicativo Móvel','Estamos à procura de um desenvolvedor de aplicativos móveis para criar um aplicativo incrível que transformará a experiência dos nossos clientes. Se você é especializado em desenvolvimento iOS ou Android e tem paixão por criar aplicativos inovadores, junte-se à nossa equipe.',2000.00,'Desenvolvimento iOS/Android, Swift, Kotlin, Interface de usuário móvel','Remoto','2023-09-25','2023-08-15',2,NULL);
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-04 18:10:26
