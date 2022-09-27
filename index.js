const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const employees = []

inquirer
    .prompt([
        {
            type: 'input',
            name: 'managername',
            message: 'What is the name of the manager?',
        },
        {
            type: 'input',
            name: 'manageremail',
            message: "What is the manager's email?",
        },
        {
            type: 'input',
            name: "managerID",
            message: "What is the manager's ID?",
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "What is the manager's office number?",
        },
    ]).then(response => {
        const newManager = new Manager(response.managername, response.managerID, response.manageremail, response.officeNumber)
        employees.push(newManager)
        menu()
    })
function menu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do next?',
                choices: ['Add engineer', 'Add intern', 'Finish and build team']
            },
        ]).then(response => {
            if (response.choice === 'Add engineer') {
                addEngineer()
            }
            else if (response.choice === 'Add intern') {
                addIntern()
            }
            else if (response.choice === 'Finish and build team') {
                fs.writeFile('./dist/results.html', generateHtml(employees), (err, data) => {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        })
}

function addEngineer() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'engineername',
                message: "What is the engineer's name?",
            },
            {
                type: 'input',
                name: 'engineerEmail',
                message: "What is the engineer's email?",
            },
            {
                type: 'input',
                name: 'engineerId',
                message: "What is the engineer's ID?",
            },
            {
                type: 'input',
                name: 'github',
                message: "What is the engineer's GitHub?"
            },
        ]).then(response => {
            const newEngineer = new Engineer(response.engineername, response.engineerId, response.engineerEmail, response.github)
            employees.push(newEngineer)
            menu()
        })
}

function addIntern() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'internname',
                message: "What is the intern's name?",
            },
            {
                type: 'input',
                name: 'internEmail',
                message: "What is the intern's email?"
            },
            {
                type: 'input',
                name: 'internId',
                message: "What is the intern's ID?",
            },
            {
                type: 'input',
                name: 'school',
                message: "What school does the intern go to?"
            }
        ]).then(response => {
            const newIntern = new Intern(response.internname, response.internId, response.internEmail, response.school)
            employees.push(newIntern)
            menu()
        })
}

function generateHtml(employees) {
    let employee = ""
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].getRole() === "Manager") {
            employee = employee + `<div class="card bg-primary" style="width: 18rem;">
            <div class="card-header text-white">
            <h2>${employees[i].getName()}</h2>
            <h3>${employees[i].getRole()}</h3>
            </div>
            <div class="card-body bg-light">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${employees[i].getId()}</li>
                <a href="mailto:${employees[i].getEmail()}">
                <li class="list-group-item">Email: ${employees[i].getEmail()}</li>
                </a>
                <li class="list-group-item">Ofiice Number: ${employees[i].getofficeNumber()}</li>
            </ul>
            </div>
            </div>`
        }
        if (employees[i].getRole() === "Engineer") {
            employee = employee + `<div class="card bg-primary" style="width: 18rem;">
            <div class="card-header text-white">
            <h2>${employees[i].getName()}</h2>
            <h3>${employees[i].getRole()}</h3>
            </div>
            <div class="card-body bg-light">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${employees[i].getId()}</li>
                <a href="mailto:${employees[i].getEmail()}">
                <li class="list-group-item">Email: ${employees[i].getEmail()}</li>
                </a>
                <a href="github.com/${employees[i].getGithub()}">
                <li class="list-group-item">Github: ${employees[i].getGithub()}</li>
                </a>
            </ul>
            </div>
            </div>`
        }
        if (employees[i].getRole() === "Intern") {
            employee = employee + `<div class="card bg-primary" style="width: 18rem;">
            <div class="card-header text-white">
            <h2>${employees[i].getName()}</h2>
            <h3>${employees[i].getRole()}</h3>
            </div>
            <div class="card-body bg-light">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${employees[i].getId()}</li>
                <a href="mailto:${employees[i].getEmail()}">
                <li class="list-group-item">Email: ${employees[i].getEmail()}</li>
                </a>
                <li class="list-group-item">School: ${employees[i].getSchool()}</li>
            </ul>
            </div>
            </div>`
        }
    }
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Team</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
        <link rel="stylesheet" href="./assets/css/style.css">
    </head>
        <body>
            <div class="jumbotron bg-danger text-center text-white">
                <div class="container">
                <h1 class="display-4">My Team</h1>
                </div>
            </div>
            <div class="row d-flex justify-content-around">
            ${employee}
            </div>
        </body>
        </html>
        `
}