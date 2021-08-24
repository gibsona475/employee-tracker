USE employee_db;

INSERT INTO department (name)
VALUES ("Sales"),("R&D"),("CS"); 


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Person",40000, 1), 
 ("Research",70000, 2), 
  ("Customer Service",35000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Doe", 1, NULL); 
--  values ("Alice", "Z", 2, 1); 

