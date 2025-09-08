import { Given, When, Before } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.viewport(1380, 720); // garante resolução fixa
});

Given("the DemoQA website is open", () => {
  cy.visit("/");
});

When('the {string} section is accessed', (section) => {
  cy.contains(section).scrollIntoView().click({ force: true });
});

When('the {string} submenu is clicked', (submenu) => {
  cy.contains(submenu).click();
});