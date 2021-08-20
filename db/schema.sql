DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT, 
  department_id INT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
 -- FOreign KEY 
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE, 
  PRIMARY KEY (id)

);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT, 
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL, 
  role_id INT NOT NULL,
  manager_id INT,
  -- FOreign KEY 
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE, 
  FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL, 
  PRIMARY KEY (id)

);
