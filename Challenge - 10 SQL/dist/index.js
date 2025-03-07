//INstructions
// Your task is to create a command-line application that allows the user to:
// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
// Bring in the necessary modules
import inquirer from 'inquirer';
// import express, { Request, Response} from "express";
// import { QueryResult } from "pg";
import { pool, connectToDb } from "./connections.js";
// Connect to the database
await connectToDb();
// Set up the listening port
// const PORT = process.env.PORT || 3001;
// PORT;
// const app = express();
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
// Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
const mainMenu = async () => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit',
            ],
            default: 'View all departments'
        },
    ]);
    console.log(action);
    switch (action) {
        case 'View all departments':
            await viewDepartments();
            break;
        case 'View all roles':
            await viewRoles();
            break;
        case 'View all employees':
            await viewEmployees();
            break;
        case 'Add a department':
            await addDepartment();
            break;
        case 'Add a role':
            await addRole();
            break;
        case 'Add an employee':
            await addEmployee();
            break;
        case 'Update an employee role':
            await updateEmployeeRole();
            break;
        case 'Exit':
            process.exit(0);
            break;
    }
    mainMenu();
};
//
const viewDepartments = async () => {
    console.log('Viewing all departments...');
    const res = await pool.query('SELECT * FROM department');
    if (!res || !res.rows.length) {
        console.log('No departments found');
        return;
    }
    console.table(res.rows);
};
const viewRoles = async () => {
    console.log('Viewing all roles...');
    const res = await pool.query('SELECT * FROM role');
    if (!res || !res.rows.length) {
        console.log('No roles found');
        return;
    }
    console.table(res.rows);
};
const viewEmployees = async () => {
    console.log('Viewing all employees...');
    const res = await pool.query('SELECT * FROM employee');
    if (!res || !res.rows.length) {
        console.log('No employees found');
        return;
    }
    console.table(res.rows);
};
const addDepartment = async () => {
    console.log('Adding a department...');
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'New Department name:',
            default: 'Dept of Novelty',
        },
    ]);
    await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
    console.log(`Added department ${name}`);
};
const addRole = async () => {
    const { title, salary, department_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the new Job Title:',
            default: 'VP of Newness',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the base salary:',
            default: '188000',
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department ID for the role:',
            default: '6',
        }
    ]);
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
    console.log(`Added role!: ${title} @ ${salary}`);
};
const addEmployee = async () => {
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter first name:',
            default: 'Newbie',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter last name:',
            default: 'McNewberson',
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the role ID for the employee:',
            default: '2',
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the manager ID for the employee (or leave blank if none)',
            default: '6',
        },
    ]);
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id || null]);
    console.log(`Added employee ${first_name} ${last_name}`);
};
const updateEmployeeRole = async () => {
    const { employee_id, role_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'Enter the ID of the employee to update:',
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the new role ID for the employee:',
            default: '2',
        },
    ]);
    await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
    console.log(`Updated employee ${employee_id} to role ${role_id}`);
};
mainMenu();
