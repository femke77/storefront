DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL,
    over_head_costs DECIMAL(10, 2) NOT NULL DEFAULT 0,
    PRIMARY KEY (department_id)
);

--To normalize the db properly and add FK between these tables the old department_name
--was changed to department_id
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_id INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  product_sales DECIMAL(10, 2) DEFAULT 0,
  PRIMARY KEY (item_id)
);

ALTER TABLE products 
ADD CONSTRAINT fk_DeptProduct
FOREIGN KEY (department_id) REFERENCES
departments(department_id)