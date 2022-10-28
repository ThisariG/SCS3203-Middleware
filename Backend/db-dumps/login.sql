-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 28, 2022 at 10:02 AM
-- Server version: 5.7.32
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `login`
--
CREATE DATABASE IF NOT EXISTS `login` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `login`;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `username`, `email`, `role`, `password`) VALUES
(29, 'thisari', 't@g.com', 'seller', '$2b$10$VMTNevMY5bFX/yYeK.jdHuj5AihzgEWWdUMfmAVkRL9Z7VfMQZ1ri'),
(30, 'visal', 'v@g.com', 'buyer', '$2b$10$v2r8Q0BAYFj8v.8pWuW9..j/Pgb4WnYedNd7PDlbgQBtuwDTRCjgu'),
(31, 'thisari', 'm@gmail.com', NULL, '$2b$10$/BSCtCz3wYr2r1.Ik.STqO6/zY3jiloO8Hpzg3ThXLj8fteRjoREe'),
(32, 'asdasd', 'asdasda@g.com', 'seller', '$2b$10$8GE/KaR8Y2Srj.Mh.NLKWuWzvsq3UQhiRe9.iHnRhcLoxDpT6J79i'),
(33, 'sadasd', 'q@gmail.com', 'buyer', '$2b$10$HdjdY0cOLi45flEj6a9v0uyLNmwkJHa81BGvZir.kSQXlKNFnK8YS');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
