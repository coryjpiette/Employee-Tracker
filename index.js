
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

            message: "Please select an option.",
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


function addEmployee() {

    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "New Employee First Name: "
        },
        {
            name: "last_name",
            type: "input",
            message: "New Employee Last Name: "
        },
        {
            name: "role",
            type: "list",
            message: "What is their role?",
            choices: selectRole()
        },
        {
            name: "manager",
            type: "list",
            message: "Who is their manager?",
            choices: selectManager()
        }
    ])

    .then(function (data)
    {
      var roleId = selectRole().indexOf(data.role) + 1
      var managerId = selectManager().indexOf(data.choice) + 1

      db.query('INSERT INTO employee SET ?',
        {
          first_name: data.first_name,
          last_name: data.last_name,
          manager_id: managerId,
          role_id: roleId
        },function (err)
      {
        console.table(data)
        initPrompt()
      })
    })
}

// gnerating array for roles
function selectRole()
{
  db.query('SELECT title FROM role',function (err,res)
  {
    for (var i = 0; i < res.length; i++) {
      allRoles.push(res[i].title)
    }
  })

  return allRoles;
}
// ! Working
// making array of all managers
function selectManager()
{
  db.query('SELECT first_name, last_name FROM employee WHERE manager_id IS NULL',function (err,res)
  {
    for (var i = 0; i < res.length; i++) {
      allManagers.push(res[i].first_name)
    }
  })
  return allManagers;
}

function addDepartment()
{
  {
    inquirer.prompt([
      {
        name: "department",
        type: "input",
        message: "Enter the new department name: "

      }
    ])
      .then(function (data)
      {

        db.query('INSERT INTO department SET ?',
          {
            name: data.department,
          },function (err)
        {
          console.table(data)
          initPrompt()
        })
  
  
      })
  }
}
