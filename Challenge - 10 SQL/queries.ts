import inquirer from 'inquirer';
import { Client } from 'pg';

const viewDepartments = async (client: Client): Promise<void> => {
  const res = await client.query('SELECT * FROM department');
  console.table(res.rows);
};

const viewRoles = async (client: Client): Promise<void> => {
  const res = await client.query('SELECT * FROM role');
  console.table(res.rows);
};

const viewEmployees = async (client: Client): Promise<void> => {
  const res = await client.query('SELECT * FROM employee');
  console.table(res.rows);
};

const addDepartment = async (client: Client): Promise<void> => {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'New Department name:',
      default: 'New Department',
    },
  ]);
  await client.query('INSERT INTO department (name) VALUES ($1)', [name]);
  console.log(`Added department ${name}`);
};

const addRole = async (client: Client): Promise<void> => {
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
      default: '88',
    },
  ]);
  await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
  console.log(`Added role!: ${title}`);
};

const addEmployee = async (client: Client): Promise<void> => {
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
      default:'1',
    },
  ]);
  await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id || null]);
  console.log(`Added employee ${first_name} ${last_name}`);
};

const updateEmployeeRole = async (client: Client): Promise<void> => {
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
    },
  ]);
  await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
  console.log(`Updated employee ${employee_id} to role ${role_id}`);
};

export {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
