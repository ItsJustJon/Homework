// GIVEN a command-line application that accepts user input
// WHEN I am prompted for information about my application repository
// THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// WHEN I enter my project title
// THEN this is displayed as the title of the README
// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README


// TODO: Include packages needed for this application
import inquirer from "inquirer";
import fs from "fs";
import generateMarkdown from "./utils/generateMarkdown.js";

// TODO: Create an array of questions for user input
const questions = [
    inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "What is the title of your project?",
                default: "Auto-generated README.md",
            },
            {
                type: "input",
                name: "description",
                message: "Please provide a description of what your project does.",
                default: "This projected is designed to auto-generate a README.md file for your project.",
            },
            {
                type: "input",
                name: "installation",
                message: "Please provide installation instructions.",
                default: "To install this project, run node index.js in the terminal.",
            },
            {
                type: "input",
                name: "usage",
                message: "Please provide usage information.",
                default: "This project's use is to auto-generate a README.md file for your project.",
            },
            {
                type: "list",
                name: "license",
                message: "Please choose a license for your project.",
                choices: ["Apache 2.0","GNU GPLv3","MIT","ISC", "None"],
                // Did not add BSD 2-Clause, BSD 3-Clause, Boost, Creative Commons Zero, Eclipse Public License 2.0, GNU AGPLv3, GNU GPLv2, GNU LGPLv3, Mozilla Public License 2.0, or The Unlicense
                default: "MIT",
            },
            {
                type: "input",
                name: "contribution",
                message: "Please provide contribution guidelines.",
                default: "To contribute to this project, please fork the repository and create a pull request.",
            },
            {
                type: "input",
                name: "tests",
                message: "Please provide test instructions.",
                default: "There are no tests for this project.",
            },
            {
                type: "input",
                name: "gitHubName",
                message: "Please provide your GitHub username.",
                default: "ItsJustJon",
            },
            {
                type: "input",
                name: "emailAddy",
                message: "Please provide your email address.",
                default: "Jonathan.Hummer@gmail.com",
            },
        ])
        .then((answers) => {
            writeToFile("README.md", generateMarkdown(answers));
        })
];

// TODO: Create a function to write README file
function writeToFile(fileName, markdown) {
    console.log(markdown);
    fs.writeFile(fileName, markdown, (err) => {
        if (err) {
            throw err;
        }
        console.log("README.md has been created!");
    });
}

// TODO: Create a function to initialize app
function init() {
    // inquirer.prompt(questions);
}

// Function call to initialize app
init();
