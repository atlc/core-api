CREATE DATABASE core_api;
USE core_api;


DROP TABLE Users;
CREATE TABLE Users (
	id VARCHAR(40) PRIMARY KEY NOT NULL,
    username VARCHAR(40) NOT NULL UNIQUE,
    email VARCHAR(128) NOT NULL UNIQUE,
    hashed VARCHAR(64) NOT NULL,
    roles VARCHAR(80) NOT NULL DEFAULT "[\"user\"]",
    avatar VARCHAR(256) DEFAULT "https://i.imgur.com/C7dXZKT.jpg",
    visible TINYINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);

SELECT * FROM Users

-- CREATE USER 'local_core_admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'local_core_admin';
-- GRANT ALL PRIVILEGES ON core_api.* TO 'local_core_admin'@'localhost';
-- FLUSH PRIVILEGES;