-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 28, 2022 at 10:01 AM
-- Server version: 5.7.32
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `delivery`
--
CREATE DATABASE IF NOT EXISTS `delivery` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `delivery`;

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

CREATE TABLE IF NOT EXISTS `delivery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `items` json NOT NULL,
  `delivery_price` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `delivery`
--

INSERT INTO `delivery` (`id`, `customer`, `address`, `items`, `delivery_price`) VALUES
(1, 'visal', 'colombo', '{\"id\": 3, \"name\": \"ruler\", \"price\": 500, \"amount\": 10000, \"img_url\": null}', 200),
(2, 'visal', 'colombo', '[{\"id\": 3, \"name\": \"ruler\", \"price\": 500, \"amount\": 100, \"img_url\": null}]', 100),
(3, 'visal', 'colombo', '[{\"id\": 3, \"name\": \"ruler\", \"price\": 500, \"amount\": 100, \"img_url\": null}]', 100),
(4, 'visal', 'colombo', '[{\"id\": 3, \"name\": \"ruler\", \"price\": 500, \"amount\": 100, \"img_url\": null}]', 100),
(5, 'visal', 'colombo', '[{\"id\": 3, \"name\": \"ruler\", \"price\": 500, \"amount\": 100, \"img_url\": null}]', 100);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
