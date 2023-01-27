CREATE TABLE IF NOT EXISTS `UserLocation` (
    useridx INT AUTO_INCREMENT PRIMARY KEY,
    latitude INT NOT NULL DEFAULT 0, 
    longitude INT NOT NULL DEFAULT 0, 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;;

INSERT INTO `UserLocation` (latitude, longitude) VALUES ('127.1', '59.2')