// ## Acceptance Criteria

// ```md
// GIVEN an employee payroll tracker
// WHEN I click the "Add employee" button
// THEN I am presented with a series of prompts asking for first name, last name, and salary
// WHEN I finish adding an employee
// THEN I am prompted to continue or cancel
// WHEN I choose to continue
// THEN I am prompted to add a new employee
// WHEN I choose to cancel
// THEN my employee data is displayed on the page sorted alphabetically by last name, and the console shows computed and aggregated data
// ```



// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');
const employeeTable = document.querySelector('#employee-table');


// ### Function to Collect Employees 40%
//   OK! * The `collectEmployees()` function must do the following:
//   OK! * creates a new employee object by collecting first name, last name, and salary using `prompt()` (20 points)
//   OK! * creates multiple employee objects by collecting first name, last name, and salary for each employee using `prompt()` and `confirm()` (20 points)

// Collect employee data
const collectEmployees = function () {
    // TODO: Get user input to create and return an array of employee objects
    const employees = [];
    let addEmployee = true;
    // addEmployee = confirm('This will add an employee to the Roster now. Click OK to continue or Cancel to exit.');
    // let employeeCount = employees.length;
    // console.log("Starting employee count: " + employeeCount);

    while (addEmployee) {
        // Create a new employee object
        const employee = {
          firstName: prompt("Enter the employee's first name:"),
          lastName: prompt("Enter the employee's last name:"),
          salary: prompt("Enter the employee's salary:"),
          // salary: parseFloat(prompt("Enter the employee's salary:").replace(",","").replace("$","")),
        };

        // employeeCount++;

        // Add the employee to the array
        employees.push(employee);

        // Ask the user if they want to add another employee
        // addEmployee = confirm("Employee #" + employeeCount + " has been added to the employees array. Click OK to add another employee or Cancel to exit.");
        addEmployee = confirm("Employee " + employee.firstName + " " + employee.lastName + " has been added to the employees array. Click OK to add another employee or Cancel to exit.");

        console.log(employee.firstName + " " + employee.lastName + " " + employee.salary);
    }
    
    // console.log("Ending employee count: " + employeeCount);
    // testCollect();
    return employees;
};



// ### Function to Display Average Salary 30%
//   * OK! The `displayAverageSalary()` function must do the following:
//   * OK! calculates the average salary and logs "The average employee salary between our <numberOfEmployees> employee(s) is $<averageSalaryWithTwoDecimals>" when given salaries with no decimals (15 points)
//   * OK! calculates the average salary and logs "The average employee salary between our <numberOfEmployees> employee(s) is $<averageSalaryWithTwoDecimals>" when given salaries with decimals (15 points)

// Display the average salary
const displayAverageSalary = function (employees) {
    // TODO: Calculate and display the average salary
    let salaryTotal = 0;
    for (let i = 0; i < employees.length; i++) {
        salaryTotal = salaryTotal + parseFloat(employees[i].salary);
    }
    // let totalSalary = employeesArray.reduce((totalSalary, employee) => totalSalary + employee.salary, 0);
    // let averageSalary = (employees.reduce((totalSalary, employee) => totalSalary + employee.salary, 0) / employees.length).toFixed(2);
    let averageSalary = (salaryTotal / employees.length).toFixed(2); 
    // console.log("The total payroll for the company is " + totalSalary.toLocaleString("en-US", {style: "currency", currency: "USD"}) + ", with an average salary of " + averageSalary.toLocaleString("en-US",{style: "currency", currency: "USD"}) + ".");
    // console.log("The average employee salary between our " + employees.length + " employee(s) is " + averageSalary.toLocaleString("en-US", {style: "currency", currency: "USD"}) + ".");
    console.log("The average employee salary between our " + employees.length + " employee(s) is $" + averageSalary)
};



// ### Function to Choose a Random Drawing Winner 30%
//   * OK! The `getRandomEmployee()` function should do the following:
//   * OK! chooses an employee at random and logs "Congratulations to <employeeFirstName> <employeeLastName>, our random drawing winner!" (15 points)
//   * OK! random selection method should allow for all employees to be chosen in the drawing (15 points)

// Select a random employee
const getRandomEmployee = function (employees) {
  // TODO: Select and display a random employee
  let randomEmployee = employees[Math.floor(Math.random() * employees.length)];
  console.log("Congratulations to " + randomEmployee.firstName + " " + randomEmployee.lastName + ", our random drawing winner!");


};

const testRandom = function () {
  for (let i = 0; i < 10; i++) {
    getRandomEmployee(employeesArray);
  }
}



/*
  ====================  
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
  ====================
  ====================
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
    // Get the employee table
    const employeeTable = document.querySelector('#employee-table');

    // Clear the employee table
    employeeTable.innerHTML = '';

    // Loop through the employee data and create a row for each employee
    for (let i = 0; i < employeesArray.length; i++) {
        const currentEmployee = employeesArray[i];

        const newTableRow = document.createElement('tr');

        const firstNameCell = document.createElement('td');
        firstNameCell.textContent = currentEmployee.firstName;
        newTableRow.append(firstNameCell);

        const lastNameCell = document.createElement('td');
        lastNameCell.textContent = currentEmployee.lastName;
        newTableRow.append(lastNameCell);

        const salaryCell = document.createElement('td');
        // Format the salary as currency
        salaryCell.textContent = currentEmployee.salary.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        newTableRow.append(salaryCell);

        employeeTable.append(newTableRow);
    }
};

const trackEmployeeData = function () {
    const employees = collectEmployees();

    console.table(employees);

    displayAverageSalary(employees);

    console.log('==============================');

    getRandomEmployee(employees);

    employees.sort(function (a, b) {
        if (a.lastName < b.lastName) {
          return -1;
        } else {
          return 1;
        }
    });

    displayEmployees(employees);

    // testCollect();
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);


// From the Test Code:

// let promptCount = 0;
// let confirmCount = 0;

// const promptValues = [
//   'John',
//   'Doe',
//   50000,
//   'John',
//   'Doe',
//   50000,
//   'Jane',
//   'Doe',
//   60000,
// ];
// const confirmValues = [false, true, false];

// window.prompt = function () {
//   return promptValues[promptCount++];
// };
// window.confirm = function () {
//   return confirmValues[confirmCount++];
// };

const testCollect = function () {
    console.log(employees.length);
    console.log(employees[0].firstName);
    console.log(employees[0].lastName);
    console.log(employees[0].salary);

    console.log(employees.length);
    console.log(employees[1].firstName);
    console.log(employees[1].lastName);
    console.log(employees[1].salary);

    // employees.length === 2 &&
    // employees[0].firstName === 'John' &&
    // employees[0].lastName === 'Doe' &&
    // employees[0].salary === 50000 &&
    // employees[1].firstName === 'Jane' &&
    // employees[1].lastName === 'Doe' &&
    // employees[1].salary === 60000
}