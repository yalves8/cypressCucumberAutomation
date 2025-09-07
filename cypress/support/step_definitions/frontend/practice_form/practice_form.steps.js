import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("that the DemoQA home page is accessed", () => {
  cy.visit("/");
});

When('the {string} option is accessed', (menu) => {
  cy.contains(menu).click();
});

When('the {string} submenu is clicked', (submenu) => {
  cy.contains(submenu).click();
});

When("the entire form is filled with random values", () => {
  const firstName = "Yasmin";
  const lastName = "Souza";
  const email = `yasminleticia_@hotmail.com`;

  cy.get("#firstName").type(firstName, { force: true });
  cy.get("#lastName").type(lastName, { force: true });
  cy.get("#userEmail").type(email, { force: true });
  cy.get('input[name="gender"][value="Female"]').check({ force: true });
  cy.get("#userNumber").type("986221960");

  cy.get("#dateOfBirthInput").click();
  cy.get(".react-datepicker__month-select").select("August");
  cy.get(".react-datepicker__year-select").select("1998");
  cy.get(".react-datepicker__day--028").first().click();

  cy.get(".subjects-auto-complete__value-container").type("Math{enter}");

  cy.get("#hobbies-checkbox-1").check({ force: true });
  cy.get("#hobbies-checkbox-2").check({ force: true });

  cy.get('#uploadPicture')
  .selectFile('cypress/fixtures/sample.txt', { force: true })
  
  cy.get("#currentAddress").type("Rua Doze, 01, Paulista, PE");

  cy.get('#state').click();
  cy.get('#react-select-3-option-0').click();

  cy.get('#city').click();
  cy.get('#react-select-4-option-0').click();
});

When("the form is sent", () => {
  cy.get("#submit").click({ force: true });
});

Then("the confirmation popup opens", () => {
  cy.get(".modal-content").should("be.visible");
  cy.get("#example-modal-sizes-title-lg").should(
    "contain.text",
    "Thanks for submitting the form"
  );
});

Then("close the popup", () => {
  cy.get('#adplus-anchor').invoke('remove');
  cy.get('#closeLargeModal').click();
});
