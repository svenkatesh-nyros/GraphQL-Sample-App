-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2018 at 04:48 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `real-estate`
--

-- --------------------------------------------------------

--
-- Table structure for table `agents`
--

CREATE TABLE `agents` (
  `id` VARCHAR(64) NOT NULL,
  `userId` int(11) NOT NULL,
  `realEstateFirm` varchar(255) NOT NULL,
  `license` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
   PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `home`
--

CREATE TABLE `home` (
  `id` VARCHAR(64) NOT NULL,
  `address` varchar(255) NOT NULL,
  `propertyType` enum('house','condo','townhouse','multifamily','land','other') NOT NULL,
  `status` enum('active','pending','sold','') NOT NULL,
  `mlsNumber` varchar(255) NOT NULL,
  `listingAgent` varchar(100) NOT NULL,
  `listingBroker` varchar(100) NOT NULL,
  `sellingAgent` varchar(100) NOT NULL,
  `sellingBroker` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `bedCount` varchar(3) NOT NULL,
  `bathCount` varchar(3) NOT NULL,
  `neighborhood` varchar(100) NOT NULL,
  `county` varchar(50) NOT NULL,
  `squareFeet` varchar(6) NOT NULL,
  `lotSize` varchar(6) NOT NULL,
  `yearBuilt` varchar(4) NOT NULL,
  `hoaFees` tinyint(1) NOT NULL,
  `soldDate` date NOT NULL,
  `elementarySchool` int(11) NOT NULL,
  `middleSchool` int(11) NOT NULL,
  `highSchool` int(11) NOT NULL,
  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `neighborhood`
--

CREATE TABLE `neighborhood` (
  `id` VARCHAR(64) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `npiCityRanking` varchar(2) DEFAULT NULL,
  `npiAreaRanking` varchar(2) DEFAULT NULL,
  `reviewSummary` varchar(2) DEFAULT NULL,
  `reviewOneLiner` varchar(255) NOT NULL,
  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `neighborhoodfactors`
--

CREATE TABLE `neighborhoodfactors` (
  `id` VARCHAR(64) NOT NULL,
  `neighborhoodId` int(11) NOT NULL,
  `schoolScore` varchar(5) NOT NULL,
  `crimeRate` varchar(5) NOT NULL,
  `walkability` varchar(5) NOT NULL,
  `community` varchar(5) NOT NULL,
  `curbAppeal` varchar(5) NOT NULL,
  `price` bigint(10) NOT NULL,
  `npi` varchar(5) NOT NULL,
  `valueIndex` varchar(10) NOT NULL,
   PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `neighborhoodkeywords`
--

CREATE TABLE `neighborhoodkeywords` (
  `id` VARCHAR(64) NOT NULL,
  `neighborhoodId` int(11) NOT NULL,
  `keyword` varchar(255) NOT NULL,
   PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `neighborhoodreview`
--

CREATE TABLE `neighborhoodreview` (
  `id` VARCHAR(64) NOT NULL,
  `NeighborhoodID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `author` int(11) NOT NULL,
  `createDate` datetime NOT NULL,
  `helpfulCount` int(11) NOT NULL,
  `heading` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `communityRating`int(11) NOT NULL,
  `downtownRating` int(11) NOT NULL,
  `curbAppealRating` int(11) NOT NULL,
  `jobsRating` int(11) NOT NULL,
   PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `propertyhistory`
--

CREATE TABLE `propertyhistory` (
  `id` VARCHAR(64) NOT NULL,
  `date` date NOT NULL,
  `event` varchar(255) NOT NULL,
  `price` varchar(10) NOT NULL,
   PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `questionandanswers`
--

CREATE TABLE `questionandanswers` (
  `id` VARCHAR(64) NOT NULL,
  `userId` int(11) NOT NULL,
  `neighborhoodId` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `savedneighborhoodbyuser`
--

CREATE TABLE `savedneighborhoodbyuser` (
   `id` VARCHAR(64) NOT NULL,
  `neighborhoodId` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `savedDate` date NOT NULL,
  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `school`
--

CREATE TABLE `school` (
  `id` VARCHAR(64) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` enum('public','private') NOT NULL,
  `level` enum('elementary','middle','high school','') NOT NULL,
  `rating` varchar(5) NOT NULL,
  `address` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `zipcode` varchar(100) NOT NULL,
  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `similarneighborhoods`
--

CREATE TABLE `similarneighborhoods` (
  `id` VARCHAR(64) NOT NULL,
  `neighborhoodId` int(11) NOT NULL,
   PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `topagents`
--

CREATE TABLE `topagents` (
  `id` VARCHAR(64) NOT NULL,
  `userId` int(11) NOT NULL,
  `neighborhoodId` int(11) NOT NULL,
   PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` VARCHAR(64) NOT NULL,
  `type` enum('agent','homeBuyer','homeSeller','neighbor') NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `aboutMe`  varchar(255) NOT NULL,
  `numberNeighborhoodsReviewed` int(11) NOT NULL,
  `likes` int(11) NOT NULL,
  `questionsAnswered` int(11) NOT NULL,
  `points` int(11) NOT NULL,
   PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agents`
--
ALTER TABLE `agents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home`
--
ALTER TABLE `home`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `neighborhood`
--
ALTER TABLE `neighborhood`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `neighborhoodfactors`
--
ALTER TABLE `neighborhoodfactors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `neighborhoodkeywords`
--
ALTER TABLE `neighborhoodkeywords`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `neighborhoodreview`
--
ALTER TABLE `neighborhoodreview`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `propertyhistory`
--
ALTER TABLE `propertyhistory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questionandanswers`
--
ALTER TABLE `questionandanswers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `savedneighborhoodbyuser`
--
ALTER TABLE `savedneighborhoodbyuser`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school`
--
ALTER TABLE `school`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `similarneighborhoods`
--
ALTER TABLE `similarneighborhoods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `topagents`
--
ALTER TABLE `topagents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agents`
--
ALTER TABLE `agents`
  MODIFY `id` VARCHAR(64) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `home`
--
ALTER TABLE `home`
  MODIFY `id` VARCHAR(64) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `neighborhood`
--
ALTER TABLE `neighborhood`
  MODIFY `id` VARCHAR(64) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `neighborhoodfactors`
--
ALTER TABLE `neighborhoodfactors`
  MODIFY `id` VARCHAR(64) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `neighborhoodkeywords`
--
ALTER TABLE `neighborhoodkeywords`
  MODIFY `id` VARCHAR(64) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `neighborhoodreview`
--
ALTER TABLE `neighborhoodreview`
  MODIFY `id` VARCHAR(64) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `questionandanswers`
--
ALTER TABLE `questionandanswers`
  MODIFY `id` VARCHAR(64) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `savedneighborhoodbyuser`
--
ALTER TABLE `savedneighborhoodbyuser`
  MODIFY `id` VARCHAR(64) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `school`
--
ALTER TABLE `school`
  MODIFY `id` VARCHAR(64) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `similarneighborhoods`
--
ALTER TABLE `similarneighborhoods`
  MODIFY `id` VARCHAR(64) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `topagents`
--
ALTER TABLE `topagents`
  MODIFY `id` VARCHAR(64) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` VARCHAR(64) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
