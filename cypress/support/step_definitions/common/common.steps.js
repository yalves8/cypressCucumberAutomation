import { Given, When, Before } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.viewport(1380, 720);
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

When('the {string} button is clicked', (button) => {
  if (button === 'Start') {
    cy.get('#startStopButton').click();
    
  } else {
    cy.url().then((originalUrl) => {
    cy.window().then((win) => {
      cy.stub(win, 'open').callsFake((url) => {
        cy.visit(url);
      }).as("popup");
    });

    cy.contains('button', button).scrollIntoView().click({ force: true });
  });
  }
});