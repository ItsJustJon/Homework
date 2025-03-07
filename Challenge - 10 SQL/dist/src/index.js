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
import pg from 'pg';
const { Pool } = pg;
import { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } from './queries';
const Pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: process.env.DB_NAME,
    port: 5432,
});
Pool.connect();
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
            yield viewDepartments(Pool);
            break;
        case 'View all roles':
            yield viewRoles(Pool);
            break;
        case 'View all employees':
            yield viewEmployees(Pool);
            break;
        case 'Add a department':
            yield addDepartment(Pool);
            break;
        case 'Add a role':
            yield addRole(Pool);
            break;
        case 'Add an employee':
            yield addEmployee(Pool);
            break;
        case 'Update an employee role':
            yield updateEmployeeRole(Pool);
            break;
        case 'Exit':
            Pool.end();
            return;
    }
    mainMenu();
});
mainMenu();
