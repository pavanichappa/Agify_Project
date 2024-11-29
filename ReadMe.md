# Agify API Testing Project

This project contains automated tests for the Agify API using Cucumber, Playwright, and TypeScript. The tests cover various scenarios including functional tests, load tests, and security tests.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Generating Reports](#generating-reports)
- [Project Structure](#project-structure)


## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js(v20.18.1) and npm(10.8.2) installed on your machine
- Internet connection to download dependencies
- The following npm packages installed globally:
  - `@playwright/test` (version 1.49.0)
  - `@cucumber/cucumber` (version 11.1.0)
  - `typescript` (version 5.7.2)
  - `cucumber-html-reporter` (version 6.0.0)


You can install these packages globally using the following commands:

```sh
npm install -g @playwright/test@1.49.0
npm install -g @cucumber/cucumber@11.1.0
npm install -g typescript@5.7.2
npm install -g cucumber-html-reporter@6.0.0
```

## Installation

To install the project, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/YOUR_GITHUB_USERNAME/Agify_Project.git
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
npm run test-and-report
```

This command will run the tests and generate an HTML report in the `reports` directory.

## Project Structure

The project directory structure is as follows:

```
.
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
- **Project Structure**: Describes the directory structure of the project.
