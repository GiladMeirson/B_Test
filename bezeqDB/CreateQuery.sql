Create Table Categories (
Id int identity(1,1),
Name Nvarchar(25)
) 

INSERT INTO Categories (Name)
VALUES (N'??? ???');
INSERT INTO Categories (Name)
VALUES (N'??????');
INSERT INTO Categories (Name)
VALUES (N'????? ??????');
INSERT INTO Categories (Name)
VALUES (N'??? ?????');
INSERT INTO Categories (Name)
VALUES (N'?????');
INSERT INTO Categories (Name)
VALUES (N'????????');



CREATE Table Products(
Id int Identity(1,1) Primary Key,
name Nvarchar(55),
category_Id INT,
unit_Price INT
)


INSERT INTO Products (name, category_Id, unit_Price) VALUES
('Glass Cup Set', 1, 25),
('Kitchen Knife', 1, 45),
('Cheddar Cheese', 2, 28),
('Mozzarella', 2, 22),
('Fresh Tomatoes', 3, 8),
('Bananas', 3, 12),
('Salmon Fillet', 4, 75),
('Ground Beef', 4, 45),
('Baguette', 5, 8),
('Croissant', 5, 6),
('Face Cream', 6, 65),
('Shampoo', 6, 35);


CREATE Table Orders(
Id int Identity(1,1) Primary Key,
first_name nvarchar(55),
last_name nvarchar(55),
address nvarchar(55),
email nvarchar(55),
total_price int,
total_quantity int
)

Create Table Order_product(
	Id int identity(1,1),
	order_id INT,
    product_id INT,
	FOREIGN KEY (order_id) REFERENCES Orders(Id),
   FOREIGN KEY (product_id) REFERENCES Products(Id),

)