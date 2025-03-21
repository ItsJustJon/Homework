DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;


DROP TABLE IF EXISTS department;
CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(31) UNIQUE NOT NULL
);
SELECT * FROM department;
DELETE FROM department;


DROP TABLE IF EXISTS role;
CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  title VARCHAR(31) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id)
);
Select * from role;
DELETE from role;


DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(31) NOT NULL,
  last_name VARCHAR(31) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);
Select * from employee;
DELETE from employee;

