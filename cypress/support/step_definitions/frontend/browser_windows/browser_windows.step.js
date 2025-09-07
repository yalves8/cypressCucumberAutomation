import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("the DemoQA website is open", () => {
  cy.visit("/");
});

When('the {string} section is accessed', (section) => {
  cy.contains(section).scrollIntoView().click({ force: true });
});

When('the main menu submenu {string} is clicked', (submenu) => {
  cy.contains(submenu).scrollIntoView().click({ force: true });
});

When('the {string} button is clicked', (button) => {
  cy.url().then((originalUrl) => {
    cy.window().then((win) => {
      cy.stub(win, 'open').callsFake((url) => {
        cy.visit(url);
      }).as("popup");
    });

    cy.contains('button', button).scrollIntoView().click({ force: true });

    cy.get("@popup").should("be.called");

    cy.contains('This is a sample page', { timeout: 10000 }).should('be.visible');

    cy.visit(originalUrl);
  });
});

Then("a new window should be opened", () => {
  cy.url().should('include', 'sample');
});

Then('the new window should display the text {string}', (text) => {
  cy.contains(text).should('be.visible');
});

Then('the new window is closed', () => {
  cy.go('back');
});
