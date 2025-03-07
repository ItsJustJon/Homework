INSERT INTO department (name) 
VALUES ('Operations'), ('Sales'), ('Finance'), ('I/T'), ('Human Resources'), ('Executive');

INSERT INTO role (title, salary, department_id) 
VALUES 
('Operations Manager', 115000, 1),
('Sales Manager', 60000, 2),
('Accountant', 80000, 3),
('Software Engineer', 125000, 4),
('Human Resources Manager', 65000, 5),
('CEO', 310850, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
('Brian', 'Plantamanagera', 1, NULL),
('Jonathan', 'Salesy', 2, NULL),
('Andrianna', 'Money', 3, NULL),
('Paul', 'Coder', 4, NULL),
('Patty', 'Hiring', 5, NULL),
('Jonas', 'Bigboss', 6, NULL);
