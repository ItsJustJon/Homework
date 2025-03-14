import inquirer from 'inquirer';
import axios from 'axios';
import { Client } from 'pg';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

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
      message: 'Enter the name of the department:',
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
      message: 'Enter the title of the role:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary of the role:',
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter the department ID for the role:',
    },
  ]);
  await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
  console.log(`Added role ${title}`);
};

const addEmployee = async (client: Client): Promise<void> => {
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the first name of the employee:',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last name of the employee:',
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter the role ID for the employee:',
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter the manager ID for the employee (or leave blank if none):',
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

const getWeatherForecast = async (): Promise<void> => {
  const { city } = await inquirer.prompt([
    {
      type: 'input',
      name: 'city',
      message: 'Enter the city for the weather forecast:',
    },
  ]);

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    const forecast = response.data.list.slice(0, 5).map((entry: any) => ({
      date: entry.dt_txt,
      temperature: entry.main.temp,
      description: entry.weather[0].description,
    }));

    console.log(`Here is the five-day weather forecast for ${city} in the style of a sports announcer:`);
    forecast.forEach((day: any) => {
      console.log(`On ${day.date}, the temperature will be ${day.temperature}°C with ${day.description}.`);
    });
  } catch (error) {
    console.error('Error fetching the weather forecast:', error);
  }
};

export {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  getWeatherForecast,
};
