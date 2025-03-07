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
const viewDepartments = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield client.query('SELECT * FROM department');
    console.table(res.rows);
});
const viewRoles = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield client.query('SELECT * FROM role');
    console.table(res.rows);
});
const viewEmployees = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield client.query('SELECT * FROM employee');
    console.table(res.rows);
});
const addDepartment = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = yield inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'New Department name:',
            default: 'New Department',
        },
    ]);
    yield client.query('INSERT INTO department (name) VALUES ($1)', [name]);
    console.log(`Added department ${name}`);
});
const addRole = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, salary, department_id } = yield inquirer.prompt([
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
    yield client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
    console.log(`Added role!: ${title}`);
});
const addEmployee = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, role_id, manager_id } = yield inquirer.prompt([
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
            default: '1',
        },
    ]);
    yield client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id || null]);
    console.log(`Added employee ${first_name} ${last_name}`);
});
const updateEmployeeRole = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const { employee_id, role_id } = yield inquirer.prompt([
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
    yield client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
    console.log(`Updated employee ${employee_id} to role ${role_id}`);
});
export { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole, };
