-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 24-10-2025 a las 16:18:49
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mlb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

DROP TABLE IF EXISTS `equipos`;
CREATE TABLE IF NOT EXISTS `equipos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `ciudad` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `estadio` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `fundacion` year DEFAULT NULL,
  `titulos_nacionales` int DEFAULT NULL,
  `titulos_serie_caribe` int DEFAULT NULL,
  `logo_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `foto_estadio` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `capacidad` int NOT NULL,
  `entrenador` text COLLATE utf8mb4_spanish2_ci NOT NULL,
  `presidente` text COLLATE utf8mb4_spanish2_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`id`, `nombre`, `ciudad`, `estadio`, `fundacion`, `titulos_nacionales`, `titulos_serie_caribe`, `logo_url`, `foto_estadio`, `capacidad`, `entrenador`, `presidente`) VALUES
(1, 'Leones del Caracas', 'Caracas', 'Estadio Universitario de Caracas', '1942', 20, 2, 'https://i.pinimg.com/474x/9b/1c/b8/9b1cb8f87521ffc787ba4005d6ed1523.jpg', 'https://cdn.septimaentrada.com/uploads/media/2023/07/29/casa-leones-jugara-estadio-monumental.jpg', 20720, 'José Alguacil', 'Andrés Guinand'),
(2, 'Tiburones de La Guaira', 'La Guaira', 'Estadio Universitario de Caracas', '1962', 7, 0, 'https://images.seeklogo.com/logo-png/22/1/tiburones-de-la-guaira-bbc-logo-png_seeklogo-224373.png', 'https://images.beisbolplay.com/wp-content/uploads/2024/10/nota-forum.jpg', 14300, 'Gregorio Petit', 'Roberto Mirabal'),
(3, 'Águilas del Zulia', 'Maracaibo', 'Estadio Luis Aparicio El Grande', '1969', 6, 2, 'https://images.seeklogo.com/logo-png/0/1/aguilas-del-zulia-logo-png_seeklogo-4774.png', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuLIRSfGIRRzizPFFEFO8XQccFotQLJ47g9Q&s', 23000, 'Lipso Nava', 'César Suárez'),
(4, 'Caribes de Anzoátegui', 'Puerto La Cruz', 'Estadio Alfonso Chico Carrasquel', '1987', 4, 0, 'https://i.pinimg.com/564x/ae/d7/45/aed74561e0e0adc98ded3a1d1106a24c.jpg', 'https://www.caribesbbc.com/assets/img/stadium/2.jpg', 16000, 'Asdrúbal Cabrera', 'Magglio Ordóñez'),
(5, 'Bravos de Margarita', 'Porlamar', 'Estadio Nueva Esparta', '2007', 0, 0, 'https://pbs.twimg.com/media/Cr6UFvOWIAA-Tj5.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV6_GwNODKMVxUAW8dCQ-HFbOiY8S0NhJB3w&s', 11000, 'Henry Blanco', ''),
(6, 'Cardenales de Lara', 'Barquisimeto', 'Estadio Antonio Herrera Gutiérrez', '1942', 7, 0, 'https://lacima967fm.com/wp-content/uploads/2025/01/12f6144a285c4abbf17f1c12cd23f4a5.jpg', 'https://pbs.twimg.com/media/EIoRR7aWwAE_HtL.jpg', 20450, 'César Izturis', ''),
(7, 'Navegantes del Magallanes', 'Valencia', 'Estadio José Bernardo Pérez', '1917', 13, 2, 'https://images.seeklogo.com/logo-png/9/1/navegantes-del-magallanes-logo-png_seeklogo-97602.png', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9VYANp56qWm4b8sIzG0ZUxUxgqAAGtP4hCw&s ', 15000, 'Eduardo Pérez', ''),
(8, 'Tigres de Aragua', 'Maracay', 'Estadio José Pérez Colmenares', '1963', 10, 0, 'https://lvbp.com/wp-content/uploads/2024/05/tigres-desvelo-nuevo-logo-para-la-temporada-2022-2023_665148815b109.jpeg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2Vt_Ra6lJHysEBr9h_4tdUm_Yo85Fn-iNAw&s ', 16000, 'Oswaldo Guillén', 'Víctor Zambrano');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadores`
--

DROP TABLE IF EXISTS `jugadores`;
CREATE TABLE IF NOT EXISTS `jugadores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `pos` varchar(50) NOT NULL,
  `años_en_mlb` int DEFAULT NULL,
  `año_debut` int DEFAULT NULL,
  `año_retiro` int DEFAULT NULL,
  `all_star_appearances` int DEFAULT NULL,
  `partidos_jugados` int DEFAULT NULL,
  `turnos_bateo` int DEFAULT NULL,
  `veces_al_bate` int DEFAULT NULL,
  `carreras` int DEFAULT NULL,
  `hits` int DEFAULT NULL,
  `dobles` int DEFAULT NULL,
  `triples` int DEFAULT NULL,
  `home_runs` int DEFAULT NULL,
  `carreras_impulsadas` int DEFAULT NULL,
  `bases_robadas` int DEFAULT NULL,
  `atrapado_robando` int DEFAULT NULL,
  `bases_por_bola` int DEFAULT NULL,
  `ponches` int DEFAULT NULL,
  `promedio_bateo` decimal(4,3) DEFAULT NULL,
  `porcentaje_embase` decimal(4,3) DEFAULT NULL,
  `porcentaje_slugging` decimal(4,3) DEFAULT NULL,
  `ops` decimal(4,3) DEFAULT NULL,
  `war` decimal(4,2) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `fecha_debut` date DEFAULT NULL,
  `lugar_nacimiento` varchar(100) DEFAULT NULL,
  `posiciones` varchar(50) DEFAULT NULL,
  `id_equipo` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=499 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `jugadores`
--

INSERT INTO `jugadores` (`id`, `nombre`, `pos`, `años_en_mlb`, `año_debut`, `año_retiro`, `all_star_appearances`, `partidos_jugados`, `turnos_bateo`, `veces_al_bate`, `carreras`, `hits`, `dobles`, `triples`, `home_runs`, `carreras_impulsadas`, `bases_robadas`, `atrapado_robando`, `bases_por_bola`, `ponches`, `promedio_bateo`, `porcentaje_embase`, `porcentaje_slugging`, `ops`, `war`, `fecha_nacimiento`, `fecha_debut`, `lugar_nacimiento`, `posiciones`, `id_equipo`) VALUES
(1, 'Bobby Abreu', 'RF', 18, 1996, 2014, 2, 2425, 10081, 8480, 1453, 2470, 574, 59, 288, 1363, 400, 128, 1476, 1840, 0.291, 0.395, 0.475, 0.870, 60.19, '1974-03-11', '1996-09-01', 'Maracay, Aragua', '*9DH7/8', 8),
(2, 'Wilyer Abreu', 'RF', 3, 2023, 2025, 0, 268, 927, 827, 121, 214, 55, 2, 39, 141, 17, 7, 88, 241, 0.259, 0.329, 0.472, 0.801, 7.36, '1999-06-24', '2023-08-22', 'Maracaibo, Zulia', '9H/78D', 2),
(5, 'Ronald Acuña Jr.', 'CF', 8, 2018, 2025, 5, 786, 3531, 3048, 635, 885, 155, 13, 180, 447, 201, 50, 415, 791, 0.290, 0.383, 0.527, 0.910, 27.73, '1997-12-18', '2018-04-25', 'La Guaira, La Guaira', '*987D/H', 2),
(8, 'Edgardo Alfonzo', '2B', 12, 1995, 2006, 1, 1506, 6108, 5385, 777, 1532, 282, 18, 146, 744, 53, 17, 596, 617, 0.284, 0.357, 0.425, 0.782, 28.76, '1973-11-08', '1995-04-26', 'Santa Teresa del Tuy, Miranda', '*5*4H6/D3', 8),
(10, 'Jose Altuve', '2B', 15, 2011, 2025, 9, 1948, 8585, 7782, 1227, 2367, 451, 32, 251, 876, 324, 96, 647, 1118, 0.304, 0.361, 0.467, 0.828, 53.74, '1990-05-06', '2011-07-20', 'Puerto Cabello, Carabobo', '*4D7/H6', 7),
(11, 'José Alvarado', 'P', 9, 2017, 2025, 0, 70, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0.000, 0.000, 0.000, 0.000, 4.78, '1995-05-21', '2017-05-03', 'Maracaibo, Zulia', '*1/3', 6),
(14, 'Henderson Alvarez III', 'P', 6, 2011, 2017, 1, 54, 115, 100, 5, 22, 4, 0, 1, 9, 0, 0, 1, 36, 0.220, 0.223, 0.290, 0.513, 8.50, '1990-04-18', '2011-08-10', 'Valencia, Carabobo', '1', 8),
(15, 'José Álvarez', 'P', 10, 2013, 2022, 0, 143, 8, 4, 1, 0, 0, 0, 0, 0, 0, 0, 3, 2, 0.000, 0.429, 0.000, 0.429, 4.64, '1989-05-06', '2013-06-09', 'Barcelona, Anzoategui', '*1', 2),
(17, 'Wilson Álvarez', 'P', 14, 1989, 2005, 1, 96, 104, 95, 6, 13, 0, 0, 0, 1, 0, 0, 4, 33, 0.137, 0.172, 0.137, 0.309, 24.81, '1970-03-24', '1989-07-24', 'Maracaibo, Zulia', '*1', 7),
(20, 'Elvis Andrus', 'SS', 15, 2009, 2023, 2, 2059, 8603, 7772, 1058, 2091, 380, 51, 102, 775, 347, 115, 611, 1206, 0.269, 0.325, 0.370, 0.695, 34.53, '1988-08-26', '2009-04-06', 'Maracay, Aragua', '*64H/D5', 3),
(21, 'Luis Aparicio HOF', 'SS', 18, 1956, 1973, 13, 2599, 11231, 10230, 1335, 2677, 394, 92, 83, 791, 506, 136, 736, 742, 0.262, 0.311, 0.343, 0.653, 55.86, '1934-04-29', '1956-04-17', 'Maracaibo, Zulia', '*6H', 1),
(22, 'Luis Aponte', 'P', 5, 1980, 1984, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 4.36, '1953-06-14', '1980-09-04', 'El Tigre, Anzoategui', '1', 8),
(30, 'Tony Armas', 'P', 14, 1976, 1989, 2, 1432, 5502, 5164, 614, 1302, 204, 39, 251, 815, 18, 20, 260, 1201, 0.252, 0.287, 0.453, 0.740, 15.83, '1953-07-02', '1976-09-06', 'Puerto Piritu, Anzoategui', '*9*87DH/36', 5),
(31, 'Tony Armas', 'P', 10, 1999, 2008, 0, 172, 299, 268, 6, 26, 2, 1, 0, 10, 0, 0, 4, 99, 0.097, 0.110, 0.112, 0.222, 6.86, '1978-04-29', '1999-08-16', 'Puerto Piritu, Anzoategui', '1', 2),
(32, 'Luis Arráez', '2B', 7, 2019, 2025, 3, 811, 3410, 3133, 423, 992, 167, 18, 34, 294, 28, 15, 222, 209, 0.317, 0.363, 0.414, 0.777, 16.10, '1997-04-09', '2019-05-18', 'San Felipe, Yaracuy', '*43D57H/6', 4),
(40, 'Luis Avilán', 'P', 10, 2012, 2021, 0, 371, 9, 7, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0.143, 0.143, 0.143, 0.286, 4.45, '1989-07-19', '2012-07-14', 'Caracas, Distrito Federal', '*1', 4),
(54, 'Rafael Betancourt', 'P', 12, 2003, 2015, 0, 315, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0.000, 0.000, 0.000, 0.000, 14.11, '1975-04-29', '2003-07-13', 'Cumana, Sucre', '*1', 7),
(57, 'Grégor Blanco', 'OF', 10, 2008, 2018, 0, 1060, 3349, 2929, 394, 746, 118, 39, 26, 235, 122, 40, 363, 661, 0.255, 0.338, 0.348, 0.687, 7.31, '1983-12-24', '2008-03-30', 'Caracas, Distrito Federal', '*8*7H9/D', 4),
(67, 'Asdrúbal Cabrera', 'SS', 15, 2007, 2021, 2, 1822, 7401, 6632, 886, 1763, 401, 28, 195, 869, 91, 32, 589, 1330, 0.266, 0.329, 0.423, 0.752, 30.09, '1985-11-13', '2007-08-08', 'Puerto La Cruz, Anzoategui', '*6*45H3D/1', 7),
(68, 'Miguel Cabrera', '1B', 21, 2003, 2023, 12, 2797, 11796, 10356, 1551, 3174, 627, 17, 511, 1881, 40, 21, 1258, 2105, 0.306, 0.382, 0.518, 0.901, 67.23, '1983-04-18', '2003-06-20', 'Maracay, Aragua', '*3*5*D79/H', 6),
(72, 'Miguel Cairo', 'IF', 17, 1996, 2012, 0, 1490, 4392, 3956, 504, 1044, 193, 34, 41, 394, 139, 40, 243, 482, 0.264, 0.314, 0.361, 0.675, 7.67, '1974-05-04', '1996-04-17', 'Anaco, Anzoategui', '*4*H5376/D9', 8),
(73, 'Alberto Callaspo', '3B', 10, 2006, 2015, 0, 1093, 3956, 3556, 391, 941, 170, 14, 52, 369, 22, 14, 350, 365, 0.265, 0.329, 0.364, 0.693, 9.58, '1983-04-19', '2006-08-06', 'Maracay, Aragua', '*54HD6/379', 4),
(78, 'Carlos Carrasco', 'P', 16, 2009, 2025, 0, 22, 40, 31, 1, 2, 0, 0, 0, 1, 0, 0, 1, 18, 0.065, 0.094, 0.065, 0.158, 18.57, '1987-03-21', '2009-09-01', 'Barquisimeto, Lara', '*1', 8),
(79, 'Alex Carrasquel', 'P', 8, 1939, 1949, 0, 258, 274, 229, 15, 33, 5, 0, 1, 12, 0, 1, 27, 75, 0.144, 0.240, 0.179, 0.419, 6.09, '1912-07-24', '1939-04-23', 'Caracas, Distrito Federal', '1', 6),
(80, 'Chico Carrasquel', 'SS', 10, 1950, 1959, 4, 1325, 5264, 4644, 568, 1199, 172, 25, 55, 474, 31, 28, 491, 467, 0.258, 0.333, 0.342, 0.674, 21.17, '1926-01-23', '1950-04-18', 'Caracas, Distrito Federal', '*65H/43', 5),
(91, 'Tony Castillo', 'P', 10, 1988, 1998, 0, 88, 18, 13, 1, 1, 0, 0, 0, 0, 0, 0, 1, 6, 0.077, 0.143, 0.077, 0.220, 6.33, '1963-03-01', '1988-08-14', 'Quibor, Lara', '*1', 7),
(98, 'Francisco Cervelli', 'C', 13, 2008, 2020, 0, 730, 2618, 2256, 281, 605, 102, 16, 41, 275, 17, 13, 270, 505, 0.268, 0.358, 0.382, 0.740, 14.12, '1986-03-06', '2008-09-18', 'Valencia, Carabobo', '*2H/3D54', 7),
(100, 'Gustavo Chacín', 'P', 5, 2004, 2010, 0, 43, 9, 8, 2, 1, 0, 0, 1, 1, 0, 0, 0, 2, 0.125, 0.125, 0.500, 0.625, 4.08, '1980-12-04', '2004-09-20', 'Maracaibo, Zulia', '1', 8),
(101, 'Jhoulys Chacín', 'P', 14, 2009, 2022, 0, 260, 406, 361, 16, 65, 8, 0, 2, 22, 1, 0, 11, 88, 0.180, 0.205, 0.219, 0.424, 19.09, '1988-01-07', '2009-07-25', 'Maracaibo, Zulia', '*1/H', 3),
(104, 'Endy Chávez', 'OF', 13, 2001, 2014, 0, 1151, 3436, 3149, 385, 849, 140, 34, 30, 266, 106, 42, 180, 356, 0.270, 0.308, 0.364, 0.672, 5.02, '1978-02-07', '2001-05-29', 'Valencia, Carabobo', '*879H/D', 5),
(107, 'Robinson Chirinos', 'C', 11, 2011, 2022, 0, 714, 2457, 2124, 275, 480, 114, 5, 95, 306, 5, 4, 231, 664, 0.226, 0.319, 0.419, 0.738, 12.62, '1984-06-05', '2011-07-18', 'Punto Fijo, Falcon', '*2H/D354', 2),
(109, 'Jackson Chourio', 'OF', 2, 2024, 2025, 0, 254, 1045, 973, 151, 268, 58, 8, 38, 146, 40, 14, 61, 216, 0.275, 0.320, 0.469, 0.789, 5.92, '2004-03-11', '2024-03-29', 'Maracaibo, Zulia', '798/HD', 8),
(113, 'Dave Concepción', 'SS', 19, 1970, 1988, 9, 2488, 9641, 8723, 993, 2326, 389, 48, 101, 950, 321, 109, 736, 1186, 0.267, 0.322, 0.357, 0.679, 40.13, '1948-06-17', '1970-04-06', 'Ocumare de la Costa, Aragua', '*6H453/81', 3),
(115, 'William Contreras', 'C', 6, 2020, 2025, 2, 574, 2412, 2113, 326, 575, 117, 5, 82, 302, 23, 6, 273, 525, 0.272, 0.357, 0.449, 0.806, 14.61, '1997-12-24', '2020-07-24', 'Puerto Cabello, Carabobo', '*2D/H73', 5),
(116, 'Willson Contreras', 'C', 10, 2016, 2025, 3, 1063, 4212, 3647, 518, 942, 207, 10, 171, 538, 36, 22, 415, 1019, 0.258, 0.352, 0.461, 0.813, 29.00, '1992-05-13', '2016-06-17', 'Puerto Cabello, Carabobo', '*2D3H7/95', 1),
(121, 'Omar Daal', 'P', 11, 1993, 2003, 0, 357, 315, 270, 23, 53, 8, 0, 2, 21, 0, 0, 14, 61, 0.196, 0.236, 0.248, 0.484, 8.65, '1972-03-01', '1993-04-23', 'Maracaibo, Zulia', '*1', 6),
(123, 'Vic Davalillo', 'OF', 16, 1963, 1980, 1, 1458, 4296, 4017, 510, 1122, 160, 37, 36, 329, 125, 58, 212, 422, 0.279, 0.315, 0.364, 0.680, 15.72, '1939-07-30', '1963-04-09', 'Cabimas, Zulia', '*8*H973/D1', 3),
(129, 'Bo Díaz', 'C', 13, 1977, 1989, 2, 993, 3538, 3274, 327, 834, 162, 5, 87, 452, 9, 17, 198, 429, 0.255, 0.297, 0.387, 0.684, 11.47, '1953-03-23', '1977-09-06', 'Cua, Miranda', '*2H/D', 6),
(131, 'Elias Díaz', 'C', 11, 2015, 2025, 1, 816, 2770, 2544, 271, 627, 130, 4, 68, 321, 2, 2, 190, 546, 0.246, 0.301, 0.381, 0.681, 5.47, '1990-11-17', '2015-09-12', 'Maracaibo, Zulia', '*2H/D', 1),
(140, 'Alcides Escobar', 'SS', 13, 2008, 2022, 1, 1552, 6182, 5750, 670, 1486, 249, 58, 45, 478, 178, 45, 253, 864, 0.258, 0.295, 0.345, 0.640, 10.15, '1986-12-16', '2008-09-03', 'La Sabana, La Guaira', '*6/54H8719', 3),
(143, 'Eduardo Escobar', 'IF', 13, 2011, 2023, 1, 1363, 5121, 4691, 593, 1185, 247, 46, 164, 636, 23, 18, 351, 1043, 0.253, 0.305, 0.430, 0.735, 12.43, '1989-01-05', '2011-09-02', 'La Pica, Maracay', '*5*64HD7/31289', 2),
(146, 'Kelvim Escobar', 'P', 12, 1997, 2009, 0, 21, 29, 27, 1, 3, 0, 0, 0, 1, 0, 0, 0, 13, 0.111, 0.111, 0.111, 0.222, 24.41, '1976-04-11', '1997-06-29', 'La Guaira, La Guaira', '*1', 4),
(150, 'Thairo Estrada', 'IF', 7, 2019, 2025, 0, 508, 1870, 1734, 230, 436, 79, 6, 51, 216, 53, 18, 84, 368, 0.251, 0.299, 0.392, 0.691, 4.28, '1996-02-22', '2019-04-21', 'Bejuma, Carabobo', '*46H/75D98', 2),
(151, 'Freddy Fermin', 'C', 4, 2022, 2025, 0, 268, 880, 812, 89, 218, 33, 1, 19, 85, 3, 3, 51, 163, 0.268, 0.314, 0.382, 0.695, 6.29, '1995-05-16', '2022-07-15', 'Puerto Ordaz, Bolivar', '2/DH4', 6),
(154, 'Wilmer Flores', 'IF', 13, 2013, 2025, 0, 1320, 4652, 4230, 512, 1096, 212, 5, 166, 595, 6, 3, 325, 658, 0.259, 0.316, 0.429, 0.746, 9.32, '1991-08-06', '2013-08-06', 'Valencia, Carabobo', '*345HD6', 4),
(158, 'Andrés Galarraga', '1B', 19, 1985, 2004, 5, 2257, 8916, 8096, 1195, 2333, 444, 32, 399, 1425, 128, 81, 583, 2003, 0.288, 0.347, 0.499, 0.846, 31.70, '1961-06-18', '1985-08-23', 'Caracas, Distrito Federal', '*3HD/5', 2),
(160, 'Freddy Galvis', 'SS', 10, 2012, 2021, 0, 1102, 4238, 3921, 436, 966, 171, 27, 109, 426, 57, 21, 241, 853, 0.246, 0.292, 0.387, 0.680, 9.30, '1989-11-14', '2012-04-05', 'Punto Fijo, Falcon', '*64H5/7D38', 7),
(162, 'Rich Garcés', 'P', 10, 1990, 2002, 0, 32, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0.000, 0.000, 0.000, 0.000, 4.71, '1971-05-18', '1990-09-18', 'Maracay, Aragua', '1', 4),
(163, 'Avisaíl García', 'OF', 13, 2012, 2024, 1, 1104, 4298, 3949, 496, 1038, 154, 17, 140, 524, 51, 32, 262, 1038, 0.263, 0.316, 0.417, 0.733, 9.37, '1991-06-12', '2012-08-31', 'Anaco, Anzoategui', '*9D8H/7', 8),
(165, 'Freddy García', 'P', 15, 1999, 2013, 2, 39, 99, 77, 1, 12, 2, 0, 0, 4, 0, 0, 2, 26, 0.156, 0.175, 0.182, 0.357, 34.19, '1976-10-06', '1999-04-07', 'Caracas, Distrito Federal', '*1/H', 5),
(168, 'Luis Garcia', 'P', 4, 2020, 2023, 0, 3, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0.000, 0.000, 0.000, 0.000, 4.61, '1996-12-13', '2020-09-04', 'Bolivar, Bolivar', '1', 7),
(169, 'Maikel Garcia', 'IF', 4, 2022, 2025, 1, 418, 1701, 1541, 206, 410, 80, 14, 24, 168, 82, 18, 130, 295, 0.266, 0.321, 0.383, 0.704, 6.83, '2000-03-03', '2022-07-15', 'La Sabana, Vargas', '*546/HD89', 1),
(174, 'Andrés Giménez', '2B', 6, 2020, 2025, 1, 641, 2423, 2180, 280, 557, 95, 11, 54, 246, 110, 16, 129, 450, 0.256, 0.320, 0.383, 0.703, 19.31, '1998-09-04', '2020-07-24', 'Barquisimeto, Lara', '*46/H5D', 2),
(180, 'Álex González', 'SS', 16, 1998, 2014, 1, 1609, 6248, 5776, 667, 1418, 332, 31, 157, 690, 30, 22, 300, 1168, 0.245, 0.290, 0.395, 0.685, 9.38, '1977-02-15', '1998-08-25', 'Cagua, Aragua', '*6H/35', 3),
(182, 'Carlos González', 'OF', 12, 2008, 2019, 3, 1377, 5551, 5033, 821, 1432, 302, 40, 234, 785, 122, 33, 448, 1240, 0.285, 0.343, 0.500, 0.843, 24.50, '1985-10-17', '2008-05-30', 'Maracaibo, Zulia', '*9*78H/D', 2),
(187, 'Marwin González', 'IF', 11, 2012, 2022, 0, 1138, 3882, 3526, 420, 888, 183, 8, 107, 415, 44, 28, 261, 812, 0.252, 0.310, 0.399, 0.709, 14.48, '1989-03-14', '2012-04-06', 'Puerto Ordaz, Bolivar', '*63754H9/D81', 8),
(196, 'Junior Guerra', 'P', 7, 2015, 2021, 0, 139, 106, 91, 4, 13, 5, 0, 0, 0, 0, 0, 0, 33, 0.143, 0.143, 0.198, 0.341, 5.07, '1985-01-16', '2015-06-12', 'San Felix, Bolivar', '1/H', 3),
(198, 'Carlos Guillén', 'SS', 14, 1998, 2011, 3, 1305, 5277, 4673, 733, 1331, 266, 51, 124, 660, 74, 47, 510, 804, 0.285, 0.355, 0.443, 0.798, 27.74, '1975-09-30', '1998-09-06', 'Maracay, Aragua', '*654D37H', 2),
(199, 'Ozzie Guillén', 'SS', 16, 1985, 2000, 3, 1993, 7133, 6686, 773, 1764, 275, 69, 28, 619, 169, 108, 239, 511, 0.264, 0.287, 0.338, 0.626, 21.00, '1964-01-20', '1985-04-09', 'Ocumare del Tuy, Miranda', '*6H/534D7', 6),
(202, 'Franklin Gutiérrez', '3B', 12, 2005, 2017, 0, 954, 3335, 3032, 394, 778, 150, 9, 97, 361, 78, 19, 228, 736, 0.257, 0.311, 0.408, 0.719, 18.41, '1983-02-21', '2005-08-31', 'Caracas, Distrito Federal', '*8*9H7D', 2),
(214, 'César Hernández', '2B', 10, 2013, 2022, 0, 1186, 4797, 4278, 590, 1144, 182, 33, 71, 369, 91, 40, 453, 926, 0.267, 0.341, 0.375, 0.716, 12.64, '1990-05-23', '2013-05-29', 'Valencia, Carabobo', '*4H5/867D', 6),
(218, 'Félix Hernández', 'P', 15, 2005, 2019, 6, 22, 59, 50, 3, 4, 1, 0, 1, 7, 0, 0, 2, 22, 0.080, 0.115, 0.160, 0.275, 49.75, '1986-04-08', '2005-08-04', 'Valencia, Carabobo', '*1', 2),
(224, 'Ramón Hernández', 'C', 15, 1999, 2013, 1, 1526, 5701, 5105, 580, 1345, 262, 8, 169, 757, 9, 5, 430, 734, 0.263, 0.327, 0.417, 0.744, 22.06, '1976-05-20', '1999-06-29', 'Caracas, Distrito Federal', '*2H3/D5', 8),
(232, 'Odúbel Herrera', 'OF', 7, 2015, 2022, 1, 817, 3181, 2915, 376, 791, 158, 19, 78, 305, 68, 25, 211, 663, 0.271, 0.326, 0.419, 0.745, 13.29, '1991-12-29', '2015-04-06', 'San Jose, Anzoategui', '*8H7/9', 8),
(234, 'Richard Hidalgo', 'OF', 9, 1997, 2005, 0, 987, 3929, 3459, 531, 929, 214, 19, 171, 560, 48, 34, 358, 737, 0.269, 0.345, 0.490, 0.835, 19.17, '1975-06-28', '1997-09-01', 'Caracas, Distrito Federal', '*9*87H/D', 2),
(237, 'Ender Inciarte', 'CF', 9, 2014, 2022, 1, 868, 3422, 3125, 447, 875, 138, 28, 42, 263, 118, 45, 239, 447, 0.280, 0.333, 0.382, 0.715, 17.85, '1990-10-29', '2014-05-02', 'Maracaibo, Zulia', '*879H/D', 5),
(240, 'Omar Infante', '2B', 15, 2002, 2016, 1, 1507, 5698, 5271, 609, 1427, 260, 53, 82, 542, 80, 33, 296, 776, 0.271, 0.308, 0.387, 0.695, 17.02, '1981-12-26', '2002-09-07', 'Puerto La Cruz, Anzoategui', '*465H78/D9', 8),
(243, 'César Izturis', 'SS', 13, 2001, 2013, 1, 1310, 4679, 4350, 441, 1103, 177, 34, 17, 312, 110, 53, 226, 431, 0.254, 0.293, 0.322, 0.614, 6.13, '1980-02-10', '2001-06-23', 'Barquisimeto, Lara', '*6H45/D3', 3),
(244, 'Maicer Izturis', 'IF', 11, 2004, 2014, 0, 909, 3350, 3013, 406, 810, 159, 17, 39, 334, 93, 33, 267, 355, 0.269, 0.331, 0.372, 0.703, 11.33, '1980-09-12', '2004-08-27', 'Barquisimeto, Lara', '*5*46H/D87', 4),
(250, 'Luis Leal', 'P', 6, 1980, 1985, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 10.56, '1957-03-21', '1980-05-25', 'Barquisimeto, Lara', '1', 2),
(255, 'Felipe Lira', 'P', 7, 1995, 2001, 0, 54, 21, 19, 3, 4, 0, 0, 2, 3, 0, 0, 0, 13, 0.211, 0.200, 0.526, 0.726, 5.16, '1972-04-26', '1995-04-27', 'Santa Teresa del Tuy, Miranda', '1/H', 7),
(258, 'José López', 'P', 9, 2004, 2012, 1, 1036, 4089, 3841, 421, 1005, 215, 11, 92, 480, 25, 17, 150, 471, 0.262, 0.292, 0.395, 0.688, 10.02, '1983-11-24', '2004-07-31', 'Barcelona, Anzoategui', '*4563HD/9', 2),
(259, 'Pablo López', 'P', 8, 2018, 2025, 1, 52, 89, 84, 4, 11, 4, 0, 0, 3, 0, 0, 1, 44, 0.131, 0.141, 0.179, 0.320, 16.17, '1996-03-07', '2018-06-30', 'Cabimas, Zulia', '1/H', 3),
(275, 'Germán Márquez', 'P', 10, 2016, 2025, 1, 117, 244, 212, 19, 51, 11, 1, 2, 30, 0, 0, 0, 59, 0.241, 0.241, 0.330, 0.571, 17.45, '1995-02-22', '2016-09-08', 'San Felix, Bolivar', '1/H', 3),
(280, 'Víctor Martínez', 'DH', 16, 2002, 2018, 5, 1973, 8166, 7297, 914, 2153, 423, 3, 246, 1178, 7, 7, 730, 891, 0.295, 0.360, 0.455, 0.815, 31.76, '1978-12-23', '2002-09-10', 'Ciudad Bolivar, Bolivar', '*D*23H', 8),
(290, 'José Mijares', 'P', 6, 2008, 2013, 0, 93, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0.000, 0.000, 0.000, 0.000, 4.21, '1984-10-29', '2008-09-13', 'Caracas, Distrito Federal', '*1', 2),
(297, 'Miguel Montero', 'C', 13, 2006, 2018, 2, 1185, 4343, 3801, 458, 973, 197, 7, 126, 550, 5, 9, 446, 881, 0.256, 0.340, 0.411, 0.751, 14.21, '1983-07-09', '2006-09-06', 'Caracas, Distrito Federal', '*2H/D13', 1),
(299, 'Melvin Mora', '3B', 13, 1999, 2011, 2, 1556, 6158, 5422, 794, 1503, 283, 19, 171, 754, 93, 55, 520, 953, 0.277, 0.350, 0.431, 0.781, 28.25, '1972-02-02', '1999-05-30', 'Agua Negra, Yaracuy', '*5678H4/93D', 3),
(305, 'Gabriel Moreno', 'C', 4, 2022, 2025, 0, 288, 1000, 897, 113, 251, 47, 3, 19, 126, 10, 4, 87, 170, 0.280, 0.344, 0.402, 0.746, 8.33, '2000-02-14', '2022-06-11', 'Barquisimeto, Lara', '2H/D547', 6),
(315, 'Omar Narváez', 'C', 10, 2016, 2025, 1, 681, 2308, 2023, 229, 509, 83, 2, 53, 206, 0, 2, 242, 436, 0.252, 0.335, 0.373, 0.708, 5.92, '1992-02-10', '2016-07-17', 'Maracay, Aragua', '*2HD/43', 8),
(316, 'Dioner Navarro', 'C', 13, 2004, 2016, 1, 1009, 3551, 3207, 322, 802, 142, 6, 77, 367, 14, 12, 265, 518, 0.250, 0.309, 0.370, 0.679, 6.99, '1984-02-09', '2004-09-07', 'Caracas, Distrito Federal', '*2HD', 1),
(324, 'Rougned Odor', '2B', 10, 2014, 2023, 0, 1154, 4424, 4044, 541, 930, 186, 29, 178, 568, 70, 52, 269, 1045, 0.230, 0.288, 0.422, 0.710, 6.38, '1994-02-03', '2014-05-08', 'Maracaibo, Zulia', '*4H5/D93', 1),
(329, 'Magglio Ordóñez', 'RF', 15, 1997, 2011, 6, 1848, 7745, 6978, 1076, 2156, 426, 21, 294, 1236, 94, 50, 651, 852, 0.309, 0.369, 0.502, 0.871, 38.79, '1974-01-28', '1997-08-29', 'Caracas, Distrito Federal', '*9DH/8', 6),
(342, 'Gerardo Parra', 'OF', 12, 2009, 2021, 0, 1519, 5290, 4858, 633, 1335, 269, 42, 90, 532, 97, 55, 318, 920, 0.275, 0.322, 0.403, 0.725, 10.73, '1987-05-06', '2009-05-13', 'Santa Barbara, Zulia', '*7*9H83/45D1', 3),
(344, 'David Peralta', 'OF', 11, 2014, 2024, 0, 1232, 4590, 4188, 526, 1166, 238, 48, 125, 569, 39, 16, 336, 891, 0.278, 0.335, 0.448, 0.782, 16.86, '1987-08-14', '2014-06-01', 'Valencia, Carabobo', '*79HD/81', 5),
(354, 'Martín Pérez', 'P', 14, 2012, 2025, 1, 16, 28, 26, 1, 1, 0, 0, 0, 0, 0, 0, 0, 22, 0.038, 0.038, 0.038, 0.077, 15.26, '1991-04-04', '2012-06-27', 'Guanare, Portuguesa', '*1', 7),
(357, 'Salvador Perez', 'C', 14, 2011, 2025, 9, 1676, 6780, 6361, 700, 1690, 316, 11, 295, 990, 6, 1, 266, 1280, 0.266, 0.303, 0.458, 0.760, 35.32, '1990-05-10', '2011-08-10', 'Valencia, Carabobo', '*2D3/H', 2),
(362, 'Yusmeiro Petit', 'P', 14, 2006, 2021, 0, 205, 129, 119, 6, 6, 0, 0, 0, 3, 0, 0, 3, 49, 0.050, 0.074, 0.050, 0.124, 8.59, '1984-11-22', '2006-05-14', 'Maracaibo, Zulia', '*1', 7),
(363, 'Manny Piña', 'C', 10, 2011, 2023, 0, 418, 1255, 1126, 133, 274, 55, 2, 43, 149, 4, 1, 94, 261, 0.243, 0.312, 0.410, 0.722, 6.33, '1987-06-05', '2011-08-03', 'Barquisimeto, Lara', '*2H/D35', 8),
(373, 'Martín Prado', '3B', 14, 2006, 2019, 1, 1458, 5861, 5373, 664, 1542, 316, 27, 100, 609, 40, 28, 385, 676, 0.287, 0.335, 0.412, 0.747, 27.48, '1983-10-27', '2006-04-23', 'Maracay, Aragua', '*547H3/69D', 2),
(388, 'Wilson Ramos', 'C', 12, 2010, 2021, 2, 990, 3786, 3492, 362, 946, 151, 2, 136, 534, 1, 3, 245, 638, 0.271, 0.318, 0.432, 0.750, 15.26, '1987-08-10', '2010-05-02', 'Valencia, Carabobo', '*2H/D', 1),
(389, 'Luis Rengifo', 'IF', 7, 2019, 2025, 0, 645, 2408, 2200, 267, 555, 84, 15, 60, 220, 48, 25, 163, 445, 0.252, 0.309, 0.386, 0.695, 6.64, '1997-02-26', '2019-04-25', 'Naguanagua, Carabobo', '*456H9/78D', 2),
(392, 'Juan Rincón', 'P', 10, 2001, 2010, 0, 48, 4, 4, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0.250, 0.250, 0.250, 0.500, 4.72, '1979-01-23', '2001-06-07', 'Maracaibo, Zulia', '*1', 5),
(395, 'Juan Rivera', 'IF', 12, 2001, 2012, 0, 1058, 3787, 3471, 425, 950, 182, 4, 132, 539, 17, 26, 253, 448, 0.274, 0.323, 0.443, 0.766, 9.22, '1978-07-03', '2001-09-04', 'Guarenas, Miranda', '*79H3D8/4', 8),
(401, 'Eduardo Rodríguez', 'P', 10, 2015, 2025, 0, 13, 29, 26, 1, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0.000, 0.000, 0.000, 0.000, 17.36, '1993-04-07', '2015-05-28', 'Valencia, Carabobo', '1', 1),
(402, 'Francisco Rodríguez', 'P', 16, 2002, 2017, 6, 437, 2, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0.500, 0.500, 0.500, 1.000, 24.21, '1982-01-07', '2002-09-18', 'Caracas, Distrito Federal', '*1', 2),
(416, 'Miguel Rojas', 'SS', 12, 2014, 2025, 0, 1269, 4068, 3717, 423, 964, 186, 11, 56, 354, 64, 23, 261, 502, 0.259, 0.313, 0.361, 0.674, 17.70, '1989-02-24', '2014-06-06', 'Los Teques, Miranda', '*6H453/1D7', 8),
(420, 'Héctor Rondón', 'P', 8, 2013, 2020, 0, 298, 3, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0.333, 0.333, 0.333, 0.667, 4.91, '1988-02-26', '2013-04-03', 'Guatire, Miranda', '*1', 4),
(424, 'Keibert Ruiz', 'C', 6, 2020, 2025, 0, 474, 1851, 1727, 164, 429, 82, 0, 44, 201, 10, 5, 91, 200, 0.248, 0.293, 0.372, 0.665, 4.75, '1998-07-20', '2020-08-16', 'Valencia, Carabobo', '*2H/D', 8),
(427, 'Luis Salazar', 'IF', 13, 1980, 1992, 0, 1302, 4375, 4101, 438, 1070, 144, 33, 94, 455, 117, 51, 179, 653, 0.261, 0.293, 0.381, 0.673, 9.01, '1956-05-19', '1980-08-15', 'Barcelona, Anzoategui', '*5H7689/3D41', 3),
(432, 'Aníbal Sánchez', 'P', 16, 2006, 2022, 0, 189, 400, 346, 8, 29, 1, 1, 0, 8, 0, 0, 17, 169, 0.084, 0.127, 0.092, 0.219, 28.06, '1984-02-27', '2006-06-25', 'Maracay, Aragua', '*1/H', 8),
(438, 'Yolmer Sanchez', 'P', 8, 2014, 2022, 0, 674, 2503, 2276, 253, 552, 113, 24, 32, 217, 30, 25, 165, 532, 0.243, 0.299, 0.355, 0.654, 6.52, '1992-06-29', '2014-07-13', 'Maracay, Aragua', '*45H/6D19', 6),
(440, 'Pablo Sandoval', '3B', 14, 2008, 2021, 2, 1380, 5052, 4609, 548, 1279, 262, 21, 153, 639, 12, 13, 357, 757, 0.278, 0.330, 0.443, 0.773, 19.07, '1986-08-11', '2008-08-14', 'Puerto Cabello, Carabobo', '*5H3D/241', 8),
(442, 'Johan Santana', 'P', 12, 2000, 2012, 4, 117, 279, 248, 11, 40, 12, 1, 1, 9, 0, 0, 9, 78, 0.161, 0.191, 0.230, 0.421, 51.68, '1979-03-13', '2000-04-03', 'Tovar, Merida', '*1', 2),
(443, 'Anthony Santander', 'RF', 9, 2017, 2025, 1, 796, 3324, 3014, 397, 728, 160, 6, 161, 453, 10, 7, 250, 699, 0.242, 0.305, 0.459, 0.764, 10.33, '1994-10-19', '2017-08-18', 'Margarita, Nueva Esparta', '*9D7/8H3', 3),
(446, 'Marco Scutaro', 'IF', 13, 2002, 2014, 1, 1391, 5486, 4887, 683, 1355, 269, 21, 77, 509, 55, 22, 474, 570, 0.277, 0.341, 0.388, 0.729, 22.07, '1975-10-30', '2002-07-21', 'San Felipe, Yaracuy', '*6*45H/7D93', 6),
(447, 'Antonio Senzatela', 'P', 9, 2017, 2025, 0, 106, 165, 135, 5, 9, 2, 0, 0, 12, 0, 0, 1, 76, 0.067, 0.074, 0.081, 0.155, 5.19, '1995-01-21', '2017-04-06', 'Valencia, Carabobo', '1', 7),
(449, 'Carlos Silva', 'P', 9, 2002, 2010, 0, 154, 71, 58, 0, 5, 2, 0, 0, 3, 0, 0, 4, 22, 0.086, 0.145, 0.121, 0.266, 8.54, '1979-04-23', '2002-04-01', 'Bolivar, Bolivar', '*1', 1),
(451, 'Luis Sojo', 'SS', 13, 1990, 2003, 0, 848, 2773, 2571, 300, 671, 103, 12, 36, 261, 28, 20, 124, 198, 0.261, 0.297, 0.352, 0.650, 4.16, '1965-01-03', '1990-07-14', 'Caracas, Distrito Federal', '*465H3/D7', 3),
(452, 'Yangervis Solarte', 'IF', 6, 2014, 2019, 0, 670, 2645, 2407, 282, 620, 124, 6, 75, 307, 6, 5, 189, 326, 0.258, 0.315, 0.408, 0.723, 6.67, '1987-07-03', '2014-04-02', 'Valencia, Carabobo', '*54H63/7D', 4),
(457, 'Eugenio Suárez', '3B', 12, 2014, 2025, 2, 1599, 6495, 5699, 814, 1410, 257, 15, 316, 929, 35, 20, 621, 1765, 0.247, 0.329, 0.464, 0.793, 26.32, '1991-07-18', '2014-06-04', 'Puerto Ordaz, Bolivar', '*56HD/3', 1),
(459, 'Ranger Suárez', 'P', 8, 2018, 2025, 1, 73, 34, 26, 2, 5, 2, 1, 0, 1, 0, 0, 1, 9, 0.192, 0.250, 0.346, 0.596, 17.38, '1995-08-26', '2018-07-26', 'Pie de Cuesta, Lara', '1', 3),
(460, 'Robert Suarez', 'P', 4, 2022, 2025, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 5.32, '1991-03-01', '2022-04-07', 'Bolivar, Bolivar', '1', 4),
(468, 'Yorvit Torrealba', 'C', 13, 2001, 2013, 0, 907, 3183, 2875, 306, 737, 162, 12, 56, 339, 19, 17, 222, 544, 0.256, 0.315, 0.379, 0.694, 5.43, '1978-07-19', '2001-09-05', 'Caracas, Distrito Federal', '*2H/D37', 4),
(473, 'Gleyber Torres', 'SS', 8, 2018, 2025, 3, 1004, 4172, 3704, 526, 981, 173, 4, 151, 501, 57, 25, 399, 819, 0.265, 0.337, 0.436, 0.773, 18.03, '1996-12-13', '2018-04-22', 'Caracas, Distrito Federal', '*46D/H', 1),
(476, 'César Tovar', 'IF', 12, 1965, 1976, 0, 1488, 6177, 5569, 834, 1546, 253, 55, 46, 435, 226, 108, 413, 410, 0.278, 0.335, 0.368, 0.703, 28.25, '1940-07-03', '1965-04-12', 'Caracas, Distrito Federal', '*8*7549HD6/321', 4),
(477, 'Ezequiel Tovar', 'SS', 4, 2022, 2025, 0, 383, 1614, 1521, 198, 397, 99, 11, 49, 175, 21, 12, 62, 440, 0.261, 0.292, 0.437, 0.729, 7.17, '2001-08-01', '2022-09-23', 'Maracay, Aragua', '*6', 5),
(479, 'Manny Trillo', '2B', 17, 1973, 1989, 4, 1780, 6573, 5950, 598, 1562, 239, 33, 61, 571, 56, 57, 452, 742, 0.263, 0.316, 0.345, 0.660, 11.27, '1950-12-25', '1973-06-28', 'Caripito, Monagas', '*45H3/6', 7),
(481, 'Ugueth Urbina', 'P', 11, 1995, 2005, 2, 382, 60, 53, 3, 5, 0, 0, 0, 1, 0, 0, 3, 32, 0.094, 0.143, 0.094, 0.237, 13.18, '1974-02-15', '1995-05-09', 'Caracas, Distrito Federal', '*1', 1),
(483, 'Luis Valbuena', '3B', 11, 2008, 2018, 0, 1011, 3571, 3148, 377, 710, 169, 9, 114, 367, 11, 16, 374, 788, 0.226, 0.310, 0.394, 0.703, 8.35, '1985-11-30', '2008-09-02', 'Caja Seca, Zulia', '*543H6/D7', 3),
(487, 'Felipe Vazquez', 'P', 5, 2015, 2019, 2, 298, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0.000, 0.000, 0.000, 0.000, 8.26, '1991-07-05', '2015-04-17', 'San Felipe, Yaracuy', '*1', 7),
(493, 'Omar Vizquel', 'SS', 24, 1989, 2012, 3, 2968, 12013, 10586, 1445, 2877, 456, 77, 80, 951, 404, 167, 1028, 1087, 0.272, 0.336, 0.352, 0.688, 45.59, '1967-04-24', '1989-04-03', 'Caracas, Distrito Federal', '*65H4/D379', 5),
(496, 'Carlos Zambrano', 'P', 12, 2001, 2012, 3, 365, 744, 693, 75, 165, 26, 3, 24, 71, 1, 0, 10, 240, 0.238, 0.248, 0.388, 0.636, 43.87, '1981-06-01', '2001-08-20', 'Puerto Cabello, Carabobo', '*1H', 8),
(498, 'Víctor Zambrano', 'P', 7, 2001, 2007, 0, 49, 82, 73, 3, 9, 1, 1, 0, 3, 0, 0, 0, 28, 0.123, 0.135, 0.164, 0.300, 5.08, '1975-08-06', '2001-06-21', 'Los Teques, Miranda', '1', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partidos`
--

DROP TABLE IF EXISTS `partidos`;
CREATE TABLE IF NOT EXISTS `partidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `equipo_local_id` int NOT NULL,
  `equipo_visitante_id` int NOT NULL,
  `fecha` date NOT NULL,
  `estadio` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `resultados_local` int DEFAULT NULL,
  `resultados_visitante` int DEFAULT NULL,
  `temporada` year NOT NULL,
  PRIMARY KEY (`id`),
  KEY `equipo_local_id` (`equipo_local_id`),
  KEY `equipo_visitante_id` (`equipo_visitante_id`)
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `partidos`
--

INSERT INTO `partidos` (`id`, `equipo_local_id`, `equipo_visitante_id`, `fecha`, `estadio`, `resultados_local`, `resultados_visitante`, `temporada`) VALUES
(1, 3, 1, '2023-10-21', 'Estadio Luis Aparicio El Grande', 5, 3, '2023'),
(2, 7, 2, '2023-10-21', 'Estadio José Bernardo Pérez', 4, 2, '2023'),
(3, 5, 6, '2023-10-21', 'Estadio Nueva Esparta', 6, 1, '2023'),
(4, 4, 8, '2023-10-21', 'Estadio Alfonso Chico Carrasquel', 3, 5, '2023'),
(5, 1, 2, '2023-10-22', 'Estadio Universitario de Caracas', 7, 4, '2023'),
(6, 8, 7, '2023-10-22', 'Estadio José Pérez Colmenares', 2, 3, '2023'),
(7, 6, 5, '2023-10-22', 'Estadio Antonio Herrera Gutiérrez', 0, 2, '2023'),
(8, 2, 3, '2023-10-23', 'Estadio Universitario de Caracas', 4, 7, '2023'),
(9, 1, 4, '2023-10-23', 'Estadio Universitario de Caracas', 5, 5, '2023'),
(10, 7, 8, '2023-10-24', 'Estadio José Bernardo Pérez', 6, 3, '2023'),
(11, 3, 5, '2023-11-01', 'Estadio Luis Aparicio El Grande', 3, 4, '2023'),
(12, 2, 6, '2023-11-02', 'Estadio Universitario de Caracas', 2, 6, '2023'),
(13, 8, 1, '2023-11-03', 'Estadio José Pérez Colmenares', 5, 2, '2023'),
(14, 4, 7, '2023-11-04', 'Estadio Alfonso Chico Carrasquel', 7, 3, '2023'),
(15, 5, 2, '2023-11-05', 'Estadio Nueva Esparta', 6, 6, '2023'),
(16, 6, 3, '2023-11-06', 'Estadio Antonio Herrera Gutiérrez', 1, 2, '2023'),
(17, 7, 5, '2023-11-07', 'Estadio José Bernardo Pérez', 3, 5, '2023'),
(18, 1, 8, '2023-11-08', 'Estadio Universitario de Caracas', 4, 1, '2023'),
(19, 2, 4, '2023-11-09', 'Estadio Universitario de Caracas', 2, 3, '2023'),
(20, 3, 7, '2023-11-10', 'Estadio Luis Aparicio El Grande', 5, 4, '2023'),
(21, 2, 3, '2024-10-12', 'Estadio Universitario de Caracas', 4, 2, '2024'),
(22, 4, 7, '2024-10-13', 'Estadio Alfonso Chico Carrasquel', 3, 4, '2024'),
(23, 6, 1, '2024-10-14', 'Estadio Antonio Herrera Gutiérrez', 2, 5, '2024'),
(24, 8, 5, '2024-10-15', 'Estadio José Pérez Colmenares', 3, 3, '2024'),
(25, 1, 2, '2024-10-16', 'Estadio Universitario de Caracas', 7, 1, '2024'),
(26, 3, 8, '2024-10-17', 'Estadio Luis Aparicio El Grande', 5, 5, '2024'),
(27, 4, 6, '2024-10-18', 'Estadio Alfonso Chico Carrasquel', 2, 4, '2024'),
(28, 5, 7, '2024-10-19', 'Estadio Nueva Esparta', 3, 6, '2024'),
(29, 2, 1, '2024-10-20', 'Estadio Universitario de Caracas', 1, 4, '2024'),
(30, 7, 3, '2024-10-21', 'Estadio José Bernardo Pérez', 5, 3, '2024'),
(31, 8, 4, '2024-10-22', 'Estadio José Pérez Colmenares', 2, 7, '2024'),
(32, 1, 5, '2024-10-23', 'Estadio Universitario de Caracas', 3, 3, '2024'),
(33, 6, 2, '2024-10-24', 'Estadio Antonio Herrera Gutiérrez', 4, 2, '2024'),
(34, 3, 7, '2024-10-25', 'Estadio Luis Aparicio El Grande', 5, 1, '2024'),
(35, 4, 1, '2024-10-26', 'Estadio Alfonso Chico Carrasquel', 6, 4, '2024'),
(36, 5, 8, '2024-10-27', 'Estadio Nueva Esparta', 7, 2, '2024'),
(37, 2, 6, '2024-10-28', 'Estadio Universitario de Caracas', 3, 5, '2024'),
(38, 7, 4, '2024-10-29', 'Estadio José Bernardo Pérez', 4, 4, '2024'),
(39, 1, 3, '2024-10-30', 'Estadio Universitario de Caracas', 2, 6, '2024'),
(40, 8, 5, '2024-10-31', 'Estadio José Pérez Colmenares', 3, 7, '2024');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(191) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `es_admin` int NOT NULL DEFAULT '0',
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `password_hash`, `nombre`, `es_admin`, `creado_en`) VALUES
(1, 'juanadmin@gmail.com', '$2y$12$nm7Be9KxOvC/PQui1RLCdOglA.K6gf3NK/kRodT/pbLGMLZZ3Qgya', 'Juan De abreu', 1, '2025-10-15 17:07:41'),
(2, 'juancliente@gmail.com', '$2y$12$NugXnIlT3PPnpw5DeRRzV.Ndt/Pw.67tVtRAbDCpFRHD3fDmcSeRi', 'Juan Diaz', 0, '2025-10-15 17:08:13'),
(3, 'katherineadmin@gmail.com', '$2y$12$R0odVgm51y04j6WNgUcuo.Q9kFp3yd3EZoDk7aZpgZEtlGxBk/LN6', 'katherine de abreu', 1, '2025-10-20 16:01:47');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
