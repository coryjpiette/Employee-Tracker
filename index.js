
const inquirer = require('inquirer');
const mysql = require('mysql2')
const table = require('console.table');

const allRoles = []
const allManagers = []

//Databse connection
const db = mysql.createConnection(
  {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employee_tracker_db'
  },
  console.log(`Connected to the employee_tracker_db database.`)

);

function initPrompt()
{
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        new inquirer.Separator(), 
        "Add Employee",
        "Add Role",
        "Add Department",
        new inquirer.Separator(), 
        "Update Employee",
        new inquirer.Separator(), 
        "Exit",
        new inquirer.Separator(), 
        new inquirer.Separator(), 
      ]
    }
  ]).then(function (data)
  
  {
    switch (data.choice) {
      case "View All Departments":
        viewDepartments()
        break;
      case "View All Roles":
        viewRoles()
        break;
      case "View All Employees":
        viewEmployees()
        break;
      case "Update Employee":
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
        case "Exit":
    exit()
      }

  })
}

function exit () {
  console.log("Thanks for using the Employee Tracker. Goodbye!")
  process.exit();
}

// Query for ALL departments
function viewDepartments () {
  db.query('SELECT * FROM department', function (err, results) {
    if (err) throw err;
    console.log(`
  
    --------DEPARTMENTS---------------
    `)

    console.table(results);
    console.log(`
  -------END DEPARTMENTS---------

  ---MAIN MENU---
  `)

  // Query for ALL roles
function viewRoles () {
  db.query('SELECT department.name AS Department, role.title AS Role, role.salary AS Salary FROM role JOIN department ON role.department_id = department.id;', function (err, results) {
    if (err) throw err;
    console.log(`
  
  
  ------------ROLES---------------
  `)

  console.table(results);
  console.log(`


----------END ROLES-------------
  ---MAIN MENU---
  `)
    initPrompt()
  });
}

//Qeury for ALL employees
function viewEmployees()
{
  db.query('SELECT * FROM employee',function (err,results)
  {
    if (err) throw err;   
    console.log(`
  
    --------EMPLOYEES---------------
  `)
    console.table(results);
    console.log(`
  ----------END EMPLOYEES-------------
  ---MAIN MENU---
  `)


function addEmployee()
{
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

// generating role arrays
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

// generating manager array
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

function addRole()
{
  db.query('SELECT role.title AS selectedTitle, role.salary AS selectedSalary FROM role',function (err,res)
  {
    inquirer.prompt([
      {
        name: "selectedTitle",
        type: "input",
        message: "Enter the role you'd like to add: "
      },
      {
        name: "selectedSalary",
        type: "input",
        message: "What is the salary of this role?"
      }
    ]).then(function (res)
    {
      db.query("INSERT INTO role SET ?",
        {
          title: res.selectedTitle,
          salary: res.selectedSalary,
        },
        function (err)
        {
          console.table(res)
          initPrompt()
        }
      )
    })
  })
}


function updateEmployee()
{
  db.query('SELECT * FROM employee JOIN role ON employee.role_id = role.id;',function (err,res)
  {
    inquirer.prompt([
      {
        type: "list",
        name: "updateId",
        message: "Select an employee to update: ",
        choices: function ()
        {
          var allEmployees = []
          for (var i = 0; i < res.length; i++) {
            allEmployees.push(res[i].last_name)
          }
          return allEmployees
        },
      },
      {
        name: "role",
        type: 'list',
        message: "What is the Employee's new role?",
        choices: selectRole()
      },
    ]).then(function (data)
    {
      var roleId = selectRole().indexOf(data.role) + 1
      db.query('UPDATE employee SET WHERE ?',
        {
          id: data.updateId,
          role_id: data.roleId
        },function (err) 
      {
        console.table(data)
        initPrompt()
      })
    })
  });
}





initPrompt()

