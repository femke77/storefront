INSERT INTO departments (department_name, over_head_costs)
VALUES ("audio", 1500), ("smart phones", 1200), ("home", 1000),("fitness", 900), ("cooking", 1100), ("computing", 1235)


INSERT INTO products (product_name, department_id, price, stock_quantity)
VALUES
("bluetooth speakers", 1, 59.00, 5),
("iphone 7", 2, 299.99, 3),
("mattress topper", 3, 129.59, 9),
("sheet set, queen", 3, 79.99, 5),
("yoga mat", 4, 14.95, 2),
("boxing gloves", 4, 21.71, 9),
("toaster oven", 5, 59.29, 1),
("coffee maker", 3, 109.99, 2),
("headphones", 1, 13.22, 11),
("wireless monitor", 6, 159.00, 3);

--To see the two tables together:
SELECT * FROM products LEFT JOIN departments ON departments.department_id=products.department_id