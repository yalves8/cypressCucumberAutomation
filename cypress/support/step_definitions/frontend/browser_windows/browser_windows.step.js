import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When('the main menu submenu {string} is clicked', (submenu) => {
  cy.contains(submenu).scrollIntoView().click({ force: true });
});

Then("a new window should be opened", () => {
  cy.get("@popup").should("be.called");
});

Then('the new window should display the text {string}', (text) => {
  cy.contains('This is a sample page', { timeout: 10000 }).should('be.visible');
});

Then('the new window is closed', () => {
  cy.go('back');
});
