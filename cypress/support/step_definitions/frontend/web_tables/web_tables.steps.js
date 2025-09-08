import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from '@faker-js/faker'

When("a new record is created with random data", () => {

  cy.get('#addNewRecordButton')
    .scrollIntoView()
    .should('be.visible')
    .should('not.be.disabled')
    .click()
    .then(() => {
      cy.get('.modal-content', { timeout: 10000 }).should('be.visible');
    });
  
  cy.get('#firstName').should('be.visible').clear().type(faker.person.firstName());
  cy.get('#lastName').should('be.visible').clear().type(faker.person.lastName());
  cy.get('#userEmail').clear().type(faker.internet.email());
  cy.get('#age').clear().type(faker.number.int({ min: 18, max: 65 }).toString());
  cy.get('#salary').clear().type(faker.number.int({ min: 1000, max: 10000 }).toString());
  cy.get('#department').clear().type(faker.commerce.department());

  cy.get('#submit').click();
});

Then("the new record should appear in the table", () => {
  cy.get('.rt-tbody .rt-tr-group').last().should('exist');
});

When("the record is edited with new random data", () => {
  cy.get('.rt-tbody', { timeout: 10000 }).should('exist');
  cy.get('.action-buttons [title="Edit"]')
  .first()
  .scrollIntoView()
  .should('be.visible')
    .click({ force: true });
  
  const newFirstName = faker.person.firstName();
  cy.get('#firstName').should('be.visible').clear().type(newFirstName);
  cy.wrap(newFirstName).as('createdRecord');
  cy.get('#submit').click();
});

Then("the changes should be visible in the table", () => {
  cy.get('.rt-tbody .rt-tr-group').last().should('exist');
});

When("the record is deleted", () => {
  cy.get('@createdRecord').then((name) => {
    cy.get('.rt-tr-group').contains('div.rt-td', name).parent().within(() => {
      cy.get('[title="Delete"]').scrollIntoView().click({ force: true });
    });
  });
});

Then("the record should no longer exist in the table", () => {
  cy.get('@createdRecord').then((name) => {
    cy.contains('.rt-tbody', name, { timeout: 10000 }).should('not.exist');
  });
});