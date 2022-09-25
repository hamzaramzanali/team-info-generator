const inquirer = require('inquirer');
const fs = require('fs');

inquirer 
    .prompt ([
        {
            type: 'input',
            name: 'employee1name',
            message: 'What is the name of employee 1',
          },
          {
            type: 'input',
            name: 'employee1email',
            message: "What is employee 1's email?",
          },
    ])