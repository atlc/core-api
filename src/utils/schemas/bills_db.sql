DROP TABLE IF EXISTS BillTypes;
CREATE TABLE BillTypes (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(12) NOT NULL
);
INSERT INTO BillTypes (name) VALUES ('electric'), ('gas'), ('water'), ('internet'), ('mortgage_base'), ('mortgage_pmi'), ('homeowners_insurance'), ('property_taxes'), ('home_warranty'), ('water_and_sewer_insurance');
SELECT * FROM BillTypes;

CREATE TABLE Bills (
	id INT AUTO_INCREMENT PRIMARY KEY,
    type_id INT NOT NULL,
    amount DECIMAL(5,2) NOT NULL,
	payment_date DATE NOT NULL,
    FOREIGN KEY (type_id) REFERENCES BillTypes(id)
);
SELECT id, SUM(amount) AS monthly_total, payment_date 
	FROM Bills 
	GROUP BY DATE_FORMAT(payment_date, '%Y %M')
    -- ORDER BY monthly_total DESC;
    ORDER BY payment_date ASC;
           

SELECT b.id, bt.name, b.amount, b.payment_date FROM Bills b JOIN BillTypes bt ON b.type_id=bt.id ORDER BY b.id DESC;