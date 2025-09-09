# DemoQA Automation Project

This project contains end-to-end automation tests for the [DemoQA](https://demoqa.com/) website, implemented using **Cypress**, **Cucumber (Gherkin)**, and **JavaScript**.

## Table of Contents
- [Project Overview](#project-overview)
- [Features Tested](#features-tested)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Running Tests](#running-tests)

## Project Overview
The purpose of this project is to automate common user flows on the DemoQA website, including **Forms**, **Browser Windows**, **Web Tables**, **Progress Bar**, and **Sortable Interactions**. The tests validate functionality, UI behavior, and data integrity.

## Features Tested
1. **Forms**
   - Fill practice forms with random data
   - File upload validation
   - Submit form and validate popups
2. **Browser Windows**
   - Open new windows and validate content
   - Window handling (simulated due to Cypress limitations)
3. **Web Tables**
   - Create, edit, and delete records
   - Dynamic creation of multiple records
   - Pagination handling for verification and deletion
4. **Progress Bar**
   - Start, pause, and reset the progress bar
   - Validate progress at specific thresholds
5. **Sortable Interactions**
   - Drag and drop items into ascending order
   - Validate order dynamically

## Technologies Used
- [Cypress](https://www.cypress.io/) – End-to-end testing framework
- [Cypress Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) – Gherkin support
- [Faker.js](https://fakerjs.dev/) – Generate random test data
- [JavaScript (ES6)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) – Test implementation
- [cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events) – Simulate realistic user interactions

## Setup

1. **Clone the repository**
   - git clone <repository-url>
   - cd cypressCucumberAutomation
2. **Install dependencie**
   - npm install
3. **Ensure the .txt file for the form upload is in cypress/fixtures/.**

## Running Tests

1. **Open Cypress Test Runner**
   - npx cypress open
2. **Click e2e**
3. **Choose the feature**
