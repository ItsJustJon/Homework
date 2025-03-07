import inquirer from 'inquirer';
import { Client } from 'pg';
import { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } from './queries';

const client = new Client({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

client.connect();

const mainMenu = async (): Promise<void> => {
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
    },
  ]);

  switch (action) {
    case 'View all departments':
      await viewDepartments(client);
      break;
    case 'View all roles':
      await viewRoles(client);
      break;
    case 'View all employees':
      await viewEmployees(client);
      break;
    case 'Add a department':
      await addDepartment(client);
      break;
    case 'Add a role':
      await addRole(client);
      break;
    case 'Add an employee':
      await addEmployee(client);
      break;
    case 'Update an employee role':
      await updateEmployeeRole(client);
      break;
    case 'Exit':
      client.end();
      return;
  }

  mainMenu();
};

mainMenu();
