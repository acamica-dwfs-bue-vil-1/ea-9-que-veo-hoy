CREATE DATABASE `que_veo`;

USE `que_veo`;

CREATE TABLE `pelicula`(
  `id` int NOT NULL auto_increment,
  `titulo` varchar(100),
  `duracion` int(5),
  `director` varchar(400),
  `anio` int(5),
  `fecha_lanzamiento` date,
  `puntuacion` int(2),
  `poster` varchar(300),
  `trama` varchar(700),
  PRIMARY KEY (id)
);