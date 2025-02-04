-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Erstellungszeit: 27. Feb 2023 um 08:57
-- Server-Version: 5.7.39
-- PHP-Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `newsletter`
--
CREATE DATABASE IF NOT EXISTS `newsletter` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `newsletter`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `customers_nwl`
--

# DROP TABLE IF EXISTS `customers_nwl`;
CREATE TABLE IF NOT EXISTS `customers_nwl` (
    `id_customerNwl` int(10) NOT NULL AUTO_INCREMENT,
    `name_customerNwl` varchar(150) NOT NULL,
    `email_customerNwl` varchar(150) NOT NULL,
    `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `ip_address` text NOT NULL,
    PRIMARY KEY (`id_customerNwl`)
    ) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
    `id_users` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(150) NOT NULL,
    `password` varchar(150) NOT NULL,
    PRIMARY KEY (`id_users`)
    ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id_users`, `email`, `password`) VALUES
    (1, 'leonora@gmail.com', '$2a$12$Id0bhdDL.sM0QIfD6m8DceF/V5EBfQ8bNNgkw7MlKEatOjAj/D9na');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
