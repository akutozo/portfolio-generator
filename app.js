// const fs = require('fs');

// const generatePage = require('./src/page-template.js');

// const profileDataArgs = process.argv.slice(2);

// const [name, github] = profileDataArgs;

// fs.writeFile('./index.html', generatePage(name, github), err => {
//   if (err) throw new Error(err);

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });

const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        validate: nameInput1 => {
            if (nameInput1) {
              return true;
            } else {
              console.log('Please enter your name!');
              return false;
            }
          }
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username',
        validate: githubInput => {
            if (githubInput) {
              return true;
            } else {
              console.log('Please enter your username.');
              return false;
            }
          }
      },
      {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => confirmAbout
      }
    ]);
  };

  const promptProject = portfolioData => {
      // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
  =================
  Add a New Project
  =================
  `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput2 => {
              if (nameInput2) {
                return true;
              } else {
                console.log('Please enter your name!');
                return false;
              }
            }
          },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: descriptionInput => {
            if (descriptionInput) {
              return true;
            } else {
              console.log('Please enter a description!');
              return false;
            }
          }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: linkInput => {
            if (linkInput) {
              return true;
            } else {
              console.log('Please enter a valid link!');
              return false;
            }
          }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ],
    ).then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
      });
  };

  promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });