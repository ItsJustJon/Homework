var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from 'inquirer';
import { Client } from 'pg';
import { config } from 'dotenv';
import { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } from './queries.js';
// Load environment variables from .env file
config();
const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: process.env.DB_NAME,
    port: 5432,
});
client.connect();
const mainMenu = () => __awaiter(void 0, void 0, void 0, function* () {
    const { action } = yield inquirer.prompt([
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
            yield viewDepartments(client);
            break;
        case 'View all roles':
            yield viewRoles(client);
            break;
        case 'View all employees':
            yield viewEmployees(client);
            break;
        case 'Add a department':
            yield addDepartment(client);
            break;
        case 'Add a role':
            yield addRole(client);
            break;
        case 'Add an employee':
            yield addEmployee(client);
            break;
        case 'Update an employee role':
            yield updateEmployeeRole(client);
            break;
        case 'Exit':
            client.end();
            return;
    }
    mainMenu();
});
mainMenu();
