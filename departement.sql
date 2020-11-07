

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


--
-- Base de données :  `departement`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `num_admin` int(50) NOT NULL AUTO_INCREMENT,
  `nom_admin` varchar(50) NOT NULL,
  `prenom_admin` varchar(50) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(40) NOT NULL,
  `type` enum('admin','secretaire') NOT NULL,
  PRIMARY KEY (`num_admin`,`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`num_admin`, `nom_admin`, `prenom_admin`, `username`, `password`, `type`) VALUES
(1, 'koahla', 'zinneddine', 'zinou', '1234', 'admin');

-- --------------------------------------------------------

--
-- Structure de la table `enseignant`
--

DROP TABLE IF EXISTS `enseignant`;
CREATE TABLE IF NOT EXISTS `enseignant` (
  `num_ens` int(11) NOT NULL AUTO_INCREMENT,
  `nom_ens` varchar(40) CHARACTER SET latin1 NOT NULL,
  `prenom_ens` varchar(40) CHARACTER SET latin1 NOT NULL,
  `username` varchar(40) CHARACTER SET latin1 NOT NULL,
  `password` varchar(40) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`num_ens`,`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `enseignant`
--

INSERT INTO `enseignant` (`num_ens`, `nom_ens`, `prenom_ens`, `username`, `password`) VALUES
(1, 'seridi', 'ali', 'ali@yahoo.fr', '1233'),
(2, 'amine', 'amar', 'ami@gm.com', '145');

-- --------------------------------------------------------

--
-- Structure de la table `enseigner`
--

DROP TABLE IF EXISTS `enseigner`;
CREATE TABLE IF NOT EXISTS `enseigner` (
  `num_module` int(11) NOT NULL,
  `num_ens` int(11) NOT NULL,
  PRIMARY KEY (`num_module`,`num_ens`) USING BTREE,
  KEY `num_module` (`num_module`),
  KEY `num_ens` (`num_ens`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `enseigner`
--

INSERT INTO `enseigner` (`num_module`, `num_ens`) VALUES
(2, 2),
(3, 1),
(4, 1),
(5, 2);

-- --------------------------------------------------------

--
-- Structure de la table `etudiant`
--

DROP TABLE IF EXISTS `etudiant`;
CREATE TABLE IF NOT EXISTS `etudiant` (
  `num_etudiant` int(11) NOT NULL AUTO_INCREMENT,
  `nom_etudiant` varchar(40) CHARACTER SET latin1 NOT NULL,
  `prenom_etudiant` varchar(40) CHARACTER SET latin1 NOT NULL,
  `address` varchar(255) CHARACTER SET latin1 NOT NULL,
  `number` varchar(10) CHARACTER SET latin1 NOT NULL,
  `num_niveau` int(2) NOT NULL,
  `username` varchar(40) CHARACTER SET latin1 NOT NULL,
  `password` varchar(40) CHARACTER SET latin1 NOT NULL,
  `validation` enum('enattente','accepter','refuser') CHARACTER SET latin1 NOT NULL DEFAULT 'enattant',
  PRIMARY KEY (`num_etudiant`),
  KEY `num_niveau` (`num_niveau`)
) ENGINE=InnoDB AUTO_INCREMENT=17889 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `etudiant`
--

INSERT INTO `etudiant` (`num_etudiant`, `nom_etudiant`, `prenom_etudiant`, `address`, `number`, `num_niveau`, `username`, `password`, `validation`) VALUES
(17888, 'boussetha', 'adem ', 'guelema', '0790590708', 3, 'adams', 'pass12', 'enattente');

-- --------------------------------------------------------

--
-- Structure de la table `etudier`
--

DROP TABLE IF EXISTS `etudier`;
CREATE TABLE IF NOT EXISTS `etudier` (
  `num_niveau` int(2) NOT NULL,
  `num_salle` int(11) NOT NULL,
  `num_module` int(11) NOT NULL,
  `num_ens` int(11) NOT NULL,
  `date_etudier` enum('1','2','3','4','5') NOT NULL COMMENT '1-''dimanche'',2-''lundi'',3-''mardi'',4-''mercredi'',5-''jeudi''',
  `heure` enum('1','2','3','4','5','6') NOT NULL COMMENT '1)8-9.30/2)9.30-11/3)11-12.30/4)12.30-14/5)-14-15.30/6)-15.30-17',
  PRIMARY KEY (`num_niveau`,`num_salle`,`num_module`,`num_ens`),
  KEY `num_salle` (`num_salle`),
  KEY `num_module` (`num_module`),
  KEY `num_niveau` (`num_niveau`),
  KEY `num_ens` (`num_ens`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `etudier`
--

INSERT INTO `etudier` (`num_niveau`, `num_salle`, `num_module`, `num_ens`, `date_etudier`, `heure`) VALUES
(1, 5, 1, 2, '1', '1');

-- --------------------------------------------------------

--
-- Structure de la table `module`
--

DROP TABLE IF EXISTS `module`;
CREATE TABLE IF NOT EXISTS `module` (
  `num_module` int(11) NOT NULL AUTO_INCREMENT,
  `nom_module` varchar(40) NOT NULL,
  PRIMARY KEY (`num_module`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `module`
--

INSERT INTO `module` (`num_module`, `nom_module`) VALUES
(1, 'POO'),
(2, 'Si'),
(3, 'SE1'),
(4, 'SE2'),
(5, 'BDD'),
(6, 'PL'),
(7, 'Compilation'),
(8, 'IHM'),
(9, 'GL1'),
(10, 'GL2');

-- --------------------------------------------------------

--
-- Structure de la table `niveau`
--

DROP TABLE IF EXISTS `niveau`;
CREATE TABLE IF NOT EXISTS `niveau` (
  `num_niveau` int(2) NOT NULL AUTO_INCREMENT,
  `nom_niveau` varchar(40) NOT NULL,
  PRIMARY KEY (`num_niveau`),
  KEY `num_niveau` (`num_niveau`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `niveau`
--

INSERT INTO `niveau` (`num_niveau`, `nom_niveau`) VALUES
(1, 'l1'),
(2, 'l2'),
(3, 'l3'),
(4, 'm1'),
(5, 'm2');

-- --------------------------------------------------------

--
-- Structure de la table `salle`
--

DROP TABLE IF EXISTS `salle`;
CREATE TABLE IF NOT EXISTS `salle` (
  `num_salle` int(11) NOT NULL AUTO_INCREMENT,
  `nom_salle` varchar(5) CHARACTER SET latin1 NOT NULL,
  `type` enum('td','tp') CHARACTER SET latin1 NOT NULL,
  `nb_poste` int(2) NOT NULL,
  `datashow` enum('disponible','non_disponible') CHARACTER SET latin1 NOT NULL DEFAULT 'non_disponible',
  PRIMARY KEY (`num_salle`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `salle`
--

INSERT INTO `salle` (`num_salle`, `nom_salle`, `type`, `nb_poste`, `datashow`) VALUES
(1, 'E8-1', 'td', 20, 'non_disponible'),
(2, 'E8-2', 'td', 20, 'non_disponible'),
(3, 'E8-3', 'td', 20, 'non_disponible'),
(4, 'E8-4', 'td', 20, 'non_disponible'),
(5, 'E8-5', 'td', 20, 'non_disponible'),
(6, 'E8-6', 'td', 20, 'non_disponible'),
(7, 'E8-7', 'td', 20, 'non_disponible'),
(8, 'E8-8', 'td', 20, 'non_disponible'),
(9, 'E8-9', 'td', 20, 'non_disponible'),
(10, 'E8-10', 'tp', 20, 'non_disponible'),
(11, 'E8-11', 'tp', 20, 'non_disponible'),
(12, 'E8-12', 'tp', 20, 'disponible'),
(13, 'E8-13', 'tp', 20, 'disponible'),
(14, 'E8-14', 'tp', 20, 'disponible');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `enseigner`
--
ALTER TABLE `enseigner`
  ADD CONSTRAINT `num_ensi` FOREIGN KEY (`num_ens`) REFERENCES `enseignant` (`num_ens`),
  ADD CONSTRAINT `num_module` FOREIGN KEY (`num_module`) REFERENCES `module` (`num_module`);

--
-- Contraintes pour la table `etudiant`
--
ALTER TABLE `etudiant`
  ADD CONSTRAINT `num_niveau` FOREIGN KEY (`num_niveau`) REFERENCES `niveau` (`num_niveau`);

--
-- Contraintes pour la table `etudier`
--
ALTER TABLE `etudier`
  ADD CONSTRAINT `num_salle` FOREIGN KEY (`num_salle`) REFERENCES `salle` (`num_salle`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
