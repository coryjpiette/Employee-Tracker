
const inquirer = require('inquirer');
const mysql = require('mysql2')
const table = require('console.table');

const allManagers = []
const allRoles = []


// Database connect
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

function initPrompt()
{
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
