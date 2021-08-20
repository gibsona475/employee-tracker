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
        console.log("your choice is", response.DepartmentQuestions);
        //SWICTH OR IF ELSEIF 
        if(response.DepartmentQuestions === 'View Department') {
            viewDepartment(); 
        }
        
    }); 

}

init();


function viewDepartment(){
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