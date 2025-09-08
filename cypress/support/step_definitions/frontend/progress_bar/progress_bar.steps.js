import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When('the progress bar is stopped before reaching 25%', () => {
  const checkProgress = () => {
    cy.get('#progressBar').invoke('text').then((text) => {
      const numValue = Number(text.replace('%', '').trim());
        
      if (!isNaN(numValue) && numValue >= 20 && numValue < 25) {
        cy.get('#startStopButton').click();
      } else if (numValue < 25) {
        cy.wait(100);
        checkProgress();
      }
    });
  };

  checkProgress();
});

Then('the progress bar value should be less than or equal to 25%', () => {
  cy.get('#progressBar')
    .invoke('text')
    .then((text) => {
      const numValue = Number(text.replace('%', '').trim());
      expect(numValue).to.be.at.most(25);
    });
});

When('the progress bar reaches 100%', () => {
  const waitFor100 = () => {
    cy.get('#progressBar')
      .invoke('text')
      .then((text) => {
        const numValue = Number(text.replace('%', '').trim());

        if (numValue < 100) {
          cy.wait(100);
          waitFor100();
        } else {
          expect(numValue).to.eq(100);
        }
      });
  };

  waitFor100();
});

Then('the progress bar is reset', () => {
  cy.get('#resetButton')
    .should('be.visible')
    .and('not.be.disabled')
    .click();

  cy.get('#progressBar')
    .invoke('text')
    .then((text) => {
      const numValue = Number(text.replace('%', '').trim());
      expect(numValue).to.eq(0);
    });
});
