-- Auth DB;
SELECT * FROM Users;
SELECT * FROM Tokens;

DELETE FROM Users where id IS NOT NULL;
DELETE FROM Tokens where id IS NOT NULL;

DROP TABLE IF EXISTS Tokens;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
	id CHAR(36) PRIMARY KEY,
    username VARCHAR(24) UNIQUE NOT NULL,
    email VARCHAR(64) UNIQUE NOT NULL,
    hashed CHAR(72) NOT NULL,
    roles VARCHAR(48) DEFAULT "[\"user\"]",
    avatar VARCHAR(128) DEFAULT "https://i.imgur.com/C7dXZKT.jpg",
    visible TINYINT DEFAULT 1,
    verified TINYINT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Tokens (
	id CHAR(36) PRIMARY KEY,
	created_at BIGINT NOT NULL, -- Letting JS assign/handle the business logic
    expires_at BIGINT NOT NULL, -- Letting JS assign/handle the business logic
    user_id CHAR(36) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

SELECT username, verified FROM Users;
SELECT u.username, u.verified, t.* FROM Tokens t JOIN Users u on t.user_id=u.id;
SELECT * FROM Tokens where id='3d2c4525-12c3-4f15-accb-5ac362dc2466';