-- Utility Bills DB;
CREATE DATABASE LocalCoreAPI_Utilities;

DROP TABLE IF EXISTS BillTypes;
CREATE TABLE BillTypes (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(12) NOT NULL
);
INSERT INTO BillTypes (name) VALUES ('electric'), ('gas'), ('water'), ('internet');

CREATE TABLE Bills (
	id INT AUTO_INCREMENT PRIMARY KEY,
    type_id INT NOT NULL,
    amount DECIMAL(5,2) NOT NULL,
	payment_date DATE NOT NULL,
    FOREIGN KEY (type_id) REFERENCES BillTypes(id)
);
