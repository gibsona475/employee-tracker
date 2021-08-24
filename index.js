const inquirer = require('inquirer')
// Import and require mysql2
const mysql = require('mysql2');
//
require("dotenv").config();

// Connect to database
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        // MySQL username,
        user: process.env.DB_USERNAME,
        // TODO: Add MySQL password here
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    console.log(`Connected to the ${process.env.DB_NAME} database.`)
);


function init() {
    console.log("Welcome to Employee Tracker !!!!");
    //prompt questions 
    inquirer.prompt([
        {
            name: "DepartmentQuestions",
            type: "list",
            message: "What would you like to do?",
            choices: [
                'View Department', 'Add Department', 'Remove Department',
                'View Role', 'Add Role', 'Remove Role',
                'View Employee', 'Add Employee', 'Remove Employee',
                "Exit"
            ]
        },
    ]).then(response => {
        // console.log("your choice is", response.DepartmentQuestions);
        //SWICTH OR IF ELSEIF 
        if (response.DepartmentQuestions === 'View Department') {
            viewDepartment();
        }
        else if (response.DepartmentQuestions === 'View Role') {
            viewRole();
        }
        else if (response.DepartmentQuestions === 'View Employee') {
            viewEmployee();
        } 
        else if (response.DepartmentQuestions === 'Add Department') {
            addDepartment();
        }
        else {
            console.log("See you again !!!");
            process.exit(0);
        }
    });

}

init();


function viewDepartment() {
    const sql = `SELECT id, name AS Department FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.table(rows);

        //call init again 
        init();
    });
}

function viewRole() {
    const sql = `SELECT role.id , role.title, role.salary,  department.name as 'Department Name' FROM role 
    LEFT JOIN department ON department.id = role.department_id`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.table(rows);

        //call init again 
        init();
    });
}

function viewEmployee() {
    const sql = `SELECT employee.id , first_name as 'First Name' , last_name as 'Last Name', role.title as 'Title', role.salary as 'Salary', manager_id as 'Manager ID'  
    from employee JOIN role ON role.id = employee.role_id `;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.table(rows);

        //call init again 
        init();
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "departName",
            type: "input",
            message: "What id the name of the department?",
        },
    ]).then(response => {

        const sql = `INSERT INTO department SET ?`;

        db.query(sql, {name: response.departName},  (err, rows) => {
            if (err) {
                console.log(err.message);
            }
            console.log(`Added ${response.departName} to database`);

            //call init again 
            init();
        });
    });
}