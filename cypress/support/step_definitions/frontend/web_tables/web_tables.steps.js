import { When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
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

//create 12 records

When('12 new records are created', () => {
  createdRecords = [];
  
  for (let i = 0; i < 12; i++) {
    const firstName = faker.person.firstName();

    createdRecords.push(firstName);

    cy.get('#addNewRecordButton')
    .scrollIntoView()
    .should('be.visible')
    .should('not.be.disabled')
    .click()
    .then(() => {
      cy.get('.modal-content', { timeout: 10000 }).should('be.visible');
    });

    cy.get('#firstName').should('be.visible').clear().type(firstName);
    cy.get('#lastName').should('be.visible').clear().type(faker.person.lastName());
    cy.get('#userEmail').clear().type(faker.internet.email());
    cy.get('#age').clear().type(faker.number.int({ min: 18, max: 65 }).toString());
    cy.get('#salary').clear().type(faker.number.int({ min: 1000, max: 10000 }).toString());
    cy.get('#department').clear().type(faker.commerce.department());

    cy.get('#submit').click();
  }
  cy.wrap(createdRecords).as('createdRecords');
});

Then('all {int} new records should appear in the table', () => {
  cy.get('@createdRecords').then((records) => {
    const foundRecords = [];

    const checkRecord = (recordName) => {
      let found = false;

      function checkPage() {
        cy.get('.rt-tbody .rt-tr-group').then(($rows) => {
          $rows.each((_, row) => {
            if (Cypress.$(row).text().includes(recordName)) {
              found = true;
              foundRecords.push(recordName);
            }
          });
        }).then(() => {
          cy.get('.-next > button.-btn').then(($next) => {
            const isDisabled = $next.prop('disabled');
            if (!found && !isDisabled) {
              cy.wrap($next).click({ force: true }).then(() => {
                checkPage();
              });
            } else if (!found && isDisabled) {
              throw new Error(`Record "${recordName}" not found in any page`);
            }
          });
        });
      }

      checkPage();
    };

    cy.wrap(records).each((recordName) => {
      checkRecord(recordName);
    }).then(() => {
      expect(foundRecords).to.have.length(records.length);
      expect(foundRecords).to.deep.eq(records);
    });
  });
});

When('all new records are deleted', () => {
  cy.get('@createdRecords').then((records) => {

    // Função para voltar à primeira página usando o botão Previous
    const goToFirstPage = () => {
      cy.get('.-previous > button.-btn').then($prev => {
        if (!$prev.prop('disabled')) {
          cy.wrap($prev).click({ force: true }).then(goToFirstPage);
        }
      });
    };

    goToFirstPage();

    const deleteRecord = (recordName) => {
      let deleted = false;

      const checkPage = () => {
        cy.get('.rt-tbody .rt-tr-group').then(($rows) => {
          $rows.each((_, row) => {
            if (Cypress.$(row).text().includes(recordName)) {
              cy.wrap(row).find('[title="Delete"]').click({ force: true });
              deleted = true;
            }
          });
        }).then(() => {
          cy.get('.-next > button.-btn').then(($next) => {
            if (!deleted && !$next.prop('disabled')) {
              cy.wrap($next).click({ force: true }).then(checkPage);
            } else if (!deleted && $next.prop('disabled')) {
              throw new Error(`Record "${recordName}" could not be deleted`);
            }
          });
        });
      };

      checkPage();
    };

    cy.wrap(records).each((recordName) => {
      deleteRecord(recordName);
    });
  });
});

Then('none of the new records should remain in the table', () => {
  cy.get('@createdRecords').then((records) => {

    const checkRecordOnAllPages = (recordName) => {
      const checkPage = () => {
        cy.get('.rt-tbody .rt-tr-group').then(($rows) => {
          const found = Array.from($rows).some(row => row.innerText.includes(recordName));
          
          cy.get('.-next > button.-btn').then(($next) => {
            if (found) {
              throw new Error(`Record "${recordName}" still exists in the table`);
            } else if (!$next.prop('disabled')) {
              cy.wrap($next).click({ force: true }).then(checkPage);
            }
          });
        });
      };

      checkPage();
    };

    records.forEach(recordName => checkRecordOnAllPages(recordName));
  });
});