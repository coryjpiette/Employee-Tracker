INSERT INTO department (id, name)
VALUES (1, "Sales"),
  (2, "Engineering"),
  (3, "Accounting"),
  (4, "Legal"),
  (5, "Management");
INSERT INTO role (id, title, salary, department_id)
VALUES (01, "Salesperson", 50000.00, 1),
  (02, "Engineer", 75000.00, 2),
  (03, "Accountant", 100000.00, 3),
  (04, "Lawyer", 150000.00, 4),
  (05, "Manager", 75000.00, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "JohnQ", "Public", 05, NULL),
  (002, "Cory", "Piette", 05, NULL),
  (003, "Bob", "Smith", 01, 001),
  (004, "Joe", "Schmo", 04, 002),
  (005, "Jane", "Doe", 03, 002);

DESCRIBE department;
DESCRIBE role;
DESCRIBE employee;

SELECT *
FROM department;
SELECT *
FROM employee;
SELECT *
FROM role;