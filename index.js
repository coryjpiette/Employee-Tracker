
const inquirer = require('inquirer');
const mysql = require('mysql2')
const table = require('console.table');

const allPositions = []
const allManagers = []

// Database connect
const db = mysql.createConnection(
  {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_tracker_db'
  },
  
  console.log(`Connected to the employee_tracker_db database.`)

);