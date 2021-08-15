
const inquirer = require('inquirer');
const mysql = require('mysql2')
const table = require('console.table');

const allManagers = []
const allRoles = []


// Database connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'employee_tracker_db'
    },

    console.log(`Succesfully connected to employee_tracker_db.`)

);

function initPrompt() {
    inquirer.prompt([
        {
            type: "list",

            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View Departments",
                "View Roles",
                "View Employees",
                "Update Employee Information",
                "Add Employee",
                "Add Role",
                "Add Department"
            ]
        }

}

]).then(function (data) {
            switch (data.choice) {
                case "View Departments":
                    viewDepartments()
                    break;
                case "View Roles":
                    viewRoles()
                    break;
                case "View Employees":
                    viewEmployees()
                    break;
                case "Update Employee Information":
                    updateEmployee()
                    break;
                case "Add Employee":
                    addEmployee()
                    break;
                case "Add Role":
                    addRole()
                    break;
                case "Add Department":
                    addDepartment()
                    break;
            }
        })
}
// data query functions
function viewDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        initPrompt()
    });
}

function viewRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        initPrompt()
    });
}

function viewEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        initPrompt()
    });
}

function viewEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        initPrompt()
    });
}