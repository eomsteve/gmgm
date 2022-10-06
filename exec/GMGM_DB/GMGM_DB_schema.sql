-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema gamulgamul_test3
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema gamulgamul_test3
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gamulgamul_test3` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `gamulgamul_test3` ;

-- -----------------------------------------------------
-- Table `gamulgamul_test3`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamulgamul_test3`.`category` (
  `category_id` BIGINT NOT NULL,
  `name` VARCHAR(60) NOT NULL,
  `img` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`category_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gamulgamul_test3`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamulgamul_test3`.`users` (
  `user_id` BIGINT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `pwd` VARCHAR(100) NULL DEFAULT NULL,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `gender` CHAR(1) NOT NULL,
  `birthday` DATE NOT NULL,
  `role` CHAR(1) NOT NULL,
  `is_deleted` BIT(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 131633
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gamulgamul_test3`.`checklist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamulgamul_test3`.`checklist` (
  `checklist_id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `reg_date` DATE NOT NULL DEFAULT (CURRENT_DATE),
  `is_deleted` BIT(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`checklist_id`),
  INDEX `FKejwoub34twukv1kdj00g8wq90` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FKejwoub34twukv1kdj00g8wq90`
    FOREIGN KEY (`user_id`)
    REFERENCES `gamulgamul_test3`.`users` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 131942
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gamulgamul_test3`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamulgamul_test3`.`product` (
  `product_id` BIGINT NOT NULL,
  `category_id` BIGINT NOT NULL,
  `name` VARCHAR(60) NOT NULL,
  `unit` INT NOT NULL,
  `measure` VARCHAR(10) NOT NULL,
  `weight` DOUBLE NOT NULL,
  `img` VARCHAR(255) NOT NULL,
  `recent_price_off` DOUBLE NOT NULL DEFAULT '0',
  `recent_price_on` DOUBLE NOT NULL DEFAULT '0',
  `price_gap_off` DOUBLE NOT NULL DEFAULT '0',
  `price_gap_on` DOUBLE NOT NULL DEFAULT '0',
  PRIMARY KEY (`product_id`),
  INDEX `FK1mtsbur82frn64de7balymq9s` (`category_id` ASC) VISIBLE,
  CONSTRAINT `FK1mtsbur82frn64de7balymq9s`
    FOREIGN KEY (`category_id`)
    REFERENCES `gamulgamul_test3`.`category` (`category_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gamulgamul_test3`.`checklist_basic_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamulgamul_test3`.`checklist_basic_item` (
  `checklist_basic_item_id` BIGINT NOT NULL AUTO_INCREMENT,
  `checklist_id` BIGINT NOT NULL,
  `product_id` BIGINT NOT NULL,
  `status` BIT(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`checklist_basic_item_id`),
  INDEX `FK5w8jentbevn4oesqhri9uvof6` (`checklist_id` ASC) VISIBLE,
  INDEX `FK5p2m3iyhdtdt431wok9x43lxv` (`product_id` ASC) VISIBLE,
  CONSTRAINT `FK5p2m3iyhdtdt431wok9x43lxv`
    FOREIGN KEY (`product_id`)
    REFERENCES `gamulgamul_test3`.`product` (`product_id`),
  CONSTRAINT `FK5w8jentbevn4oesqhri9uvof6`
    FOREIGN KEY (`checklist_id`)
    REFERENCES `gamulgamul_test3`.`checklist` (`checklist_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 705
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gamulgamul_test3`.`checklist_custom_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamulgamul_test3`.`checklist_custom_item` (
  `checklist_custom_item_id` BIGINT NOT NULL AUTO_INCREMENT,
  `checklist_id` BIGINT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `status` BIT(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`checklist_custom_item_id`),
  INDEX `FKanwu6brjiuu5plitct5ib894u` (`checklist_id` ASC) VISIBLE,
  CONSTRAINT `FKanwu6brjiuu5plitct5ib894u`
    FOREIGN KEY (`checklist_id`)
    REFERENCES `gamulgamul_test3`.`checklist` (`checklist_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 132178
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gamulgamul_test3`.`goods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamulgamul_test3`.`goods` (
  `goods_id` BIGINT NOT NULL,
  `product_id` BIGINT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `img` VARCHAR(255) NOT NULL,
  `measure` VARCHAR(10) NOT NULL,
  `cheap_url` VARCHAR(100) NULL DEFAULT NULL,
  `recent_price_off` DOUBLE NOT NULL DEFAULT '0',
  `recent_price_on` DOUBLE NOT NULL DEFAULT '0',
  `price_gap_off` DOUBLE NOT NULL DEFAULT '0',
  `price_gap_on` DOUBLE NOT NULL DEFAULT '0',
  PRIMARY KEY (`goods_id`),
  INDEX `FKrobkg7xulmpu3rgk3y28l1qoj` (`product_id` ASC) VISIBLE,
  CONSTRAINT `FKrobkg7xulmpu3rgk3y28l1qoj`
    FOREIGN KEY (`product_id`)
    REFERENCES `gamulgamul_test3`.`product` (`product_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gamulgamul_test3`.`favorite_goods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamulgamul_test3`.`favorite_goods` (
  `favorite_goods_id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `goods_id` BIGINT NOT NULL,
  `reg_date` DATE NOT NULL DEFAULT (CURRENT_DATE),
  PRIMARY KEY (`favorite_goods_id`),
  INDEX `FKiv2ix9ilhtoykk9henqln214j` (`goods_id` ASC) VISIBLE,
  INDEX `FKpc5jvvuk0itv0sga8sacslma4` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FKiv2ix9ilhtoykk9henqln214j`
    FOREIGN KEY (`goods_id`)
    REFERENCES `gamulgamul_test3`.`goods` (`goods_id`),
  CONSTRAINT `FKpc5jvvuk0itv0sga8sacslma4`
    FOREIGN KEY (`user_id`)
    REFERENCES `gamulgamul_test3`.`users` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1360
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gamulgamul_test3`.`favorite_recommend`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamulgamul_test3`.`favorite_recommend` (
  `favorite_recommend_id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `goods_id` BIGINT NOT NULL,
  `score` DOUBLE NOT NULL,
  PRIMARY KEY (`favorite_recommend_id`),
  INDEX `fk_table1_users1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_table1_goods1_idx` (`goods_id` ASC) VISIBLE,
  CONSTRAINT `fk_table1_goods1`
    FOREIGN KEY (`goods_id`)
    REFERENCES `gamulgamul_test3`.`goods` (`goods_id`),
  CONSTRAINT `fk_table1_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `gamulgamul_test3`.`users` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 351
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gamulgamul_test3`.`favorite_total_price`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamulgamul_test3`.`favorite_total_price` (
  `favorite_total_price_id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `total_price` DOUBLE NOT NULL,
  `research_date` DATE NOT NULL,
  `business` CHAR(1) NOT NULL,
  PRIMARY KEY (`favorite_total_price_id`),
  INDEX `FK7y6gmro0wl5n1glmrpja8t5vw` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK7y6gmro0wl5n1glmrpja8t5vw`
    FOREIGN KEY (`user_id`)
    REFERENCES `gamulgamul_test3`.`users` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 390338
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gamulgamul_test3`.`goods_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamulgamul_test3`.`goods_log` (
  `goods_log_id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `goods_id` BIGINT NOT NULL,
  `click_time` DATETIME NOT NULL DEFAULT (CURRNET_TIMESTAMP),
  PRIMARY KEY (`goods_log_id`),
  INDEX `fk_goods_log_users1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_goods_log_goods1_idx` (`goods_id` ASC) VISIBLE,
  CONSTRAINT `fk_goods_log_goods1`
    FOREIGN KEY (`goods_id`)
    REFERENCES `gamulgamul_test3`.`goods` (`goods_id`),
  CONSTRAINT `fk_goods_log_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `gamulgamul_test3`.`users` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 770
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gamulgamul_test3`.`goods_price`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamulgamul_test3`.`goods_price` (
  `goods_price_id` BIGINT NOT NULL AUTO_INCREMENT,
  `goods_id` BIGINT NOT NULL,
  `unit_price` DOUBLE NOT NULL,
  `price` DOUBLE NOT NULL,
  `research_date` DATE NOT NULL,
  `business` CHAR(1) NOT NULL,
  PRIMARY KEY (`goods_price_id`),
  INDEX `fk_goods_price_goods1_idx` (`goods_id` ASC) VISIBLE,
  INDEX `detail_search` (`goods_id` ASC, `business` ASC) VISIBLE,
  CONSTRAINT `fk_goods_price_goods1`
    FOREIGN KEY (`goods_id`)
    REFERENCES `gamulgamul_test3`.`goods` (`goods_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 379825
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gamulgamul_test3`.`hibernate_sequence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamulgamul_test3`.`hibernate_sequence` (
  `next_val` BIGINT NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gamulgamul_test3`.`news`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamulgamul_test3`.`news` (
  `news_id` BIGINT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(300) NOT NULL,
  `link` VARCHAR(600) NOT NULL,
  `pub_date` DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  PRIMARY KEY (`news_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 9844
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gamulgamul_test3`.`price_index`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamulgamul_test3`.`price_index` (
  `price_index_id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NULL DEFAULT NULL,
  `research_date` DATE NOT NULL,
  `value` DOUBLE NOT NULL,
  `index_type` CHAR(1) NOT NULL,
  PRIMARY KEY (`price_index_id`),
  INDEX `fk_price_index_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_price_index_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `gamulgamul_test3`.`users` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 70192
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gamulgamul_test3`.`product_price`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamulgamul_test3`.`product_price` (
  `product_price_id` BIGINT NOT NULL AUTO_INCREMENT,
  `product_id` BIGINT NOT NULL,
  `unit_price` DOUBLE NOT NULL,
  `price` DOUBLE NULL DEFAULT NULL,
  `research_date` DATE NOT NULL,
  `date_type` CHAR(1) NOT NULL,
  `business` CHAR(1) NULL DEFAULT NULL,
  PRIMARY KEY (`product_price_id`),
  INDEX `FKeupemu63ifqfc4txkskyy1hyi` (`product_id` ASC) VISIBLE,
  INDEX `detail_search` (`product_id` ASC, `date_type` ASC, `business` ASC) VISIBLE,
  CONSTRAINT `FKeupemu63ifqfc4txkskyy1hyi`
    FOREIGN KEY (`product_id`)
    REFERENCES `gamulgamul_test3`.`product` (`product_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 151927
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
