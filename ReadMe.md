# Agify API Testing Project

This repository contains an automation framework built using Cucumber, TypeScript, and Playwright for testing the Agify.io API. The framework is designed to ensure that the API functions as expected when provided a name and returns an estimated age.
In addition to functional tests, this repository also covers scenarios  for Rate Limit, Security and Performance tests.


## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Generating Reports](#generating-reports)
- [Running Tests and Generating Reports Concurrently](#running-tests-and-generating-reports-concurrently)
- [GitHub Actions Workflow](#github-actions-workflow)
- [Project Structure](#project-structure)
- [Explanation](#explanation)


## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js(v20.18.1) and npm(10.8.2) installed on your machine
- Internet connection to download dependencies
- The following npm packages installed globally:
  - `@playwright/test` (version 1.49.0)
  - `@cucumber/cucumber` (version 11.1.0)
  - `typescript` (version 5.7.2)
  - `cucumber-html-reporter` (version 6.0.0)
  - `concurrently` (version 7.6.0)


You can install these packages globally using the following commands:

```sh
npm install -g @playwright/test@1.49.0
npm install -g @cucumber/cucumber@11.1.0
npm install -g typescript@5.7.2
npm install -g cucumber-html-reporter@6.0.0
npm install -g concurrently@7.6.0
```

## Installation

To install the project, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/pavanichappa/Agify_Project.git
   cd Agify_Project
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

## Running Tests

To run the tests, use the following command:

```sh
npm run test
```

This command will execute all the Cucumber tests defined in the `features` directory.

## Generating Reports

To generate an HTML report after running the tests, use the following command:

```sh
npm run generate-report
```

This command will run the tests and generate an HTML report in the `reports` directory.

## Running Tests and Generating Reports Concurrently

To run the tests and generate the report concurrently, use the following command:

```sh
npm run test-and-report
```

This command uses `concurrently` to run the tests and generate the report at the same time.
To run the tests and generate the report concurrently, use the following command:

```sh
npm run test-and-report
```
This command uses `concurrently` to run the tests and generate the report at the same time.

## GitHub Actions Workflow

This project includes a GitHub Actions workflow to automate the testing and reporting process. The workflow is defined in the `.github/workflows/ci.yml` file.

You can view the workflow file [here](.github/workflows/ci.yml).


## Project Structure

The project directory structure is as follows:

```
..
├── .github
│   └── workflows
│       └── ci.yml
├── src
│   ├── test
│   │   ├── features
│   │   │   └── api.feature
│   │   └── steps
│   │       └── api.ts
├── reports
│   ├── results.json
│   └── results.html
├── utilities
│   └── config.json
├── cucumber.js
├── generateReport.js
├── package.json
├── tsconfig.json
└── README.md


```

- `src/test/features`: Contains the feature files with test scenarios.
- `src/test/steps`: Contains the step definitions for the Cucumber tests.
- `reports`: Contains the test results and HTML reports.
- `utilities`: Contains utility files such as configuration details, environment variables etc.
- `cucumber.js`: Cucumber configuration file.
- `generateReport.js`: Script to generate HTML reports from JSON results.
- `package.json`: Contains the project dependencies and scripts.
- `tsconfig.json`: TypeScript configuration file.
- `README.md`: Project documentation.


### Explanation

- **Prerequisites**: Lists the requirements for setting up the project.
- **Installation**: Provides instructions for cloning the repository and installing dependencies.
- **Running Tests**: Explains how to run the tests.
- **Generating Reports**: Explains how to generate HTML reports.
- **Concurrently**: This project uses the `concurrently` package to run multiple commands simultaneously. It is particularly useful for running tests and generating reports at the same time, improving efficiency and saving time.
- **GitHub Actions Workflow**:This project leverages GitHub Actions to automate the testing and reporting process. The workflow is triggered on every push and pull request, ensuring that the codebase remains stable and any issues are promptly identified. The workflow includes steps for setting up the environment, installing dependencies, running tests, and generating reports, providing a seamless CI/CD pipeline.
- **Project Structure**: Describes the directory structure of the project.
