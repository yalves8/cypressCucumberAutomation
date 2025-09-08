import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

When('the "Start" button is clicked', () => {
  cy.get('#startStopButton').click();
});

When('the progress bar is stopped before reaching 25%', () => {
  cy.get('#progressBar').then(($bar) => {
    const bar = $bar[0];
    const interval = setInterval(() => {
      const value = parseInt(bar.getAttribute('aria-valuenow'));
      if (value >= 25) {
        cy.get('#startStopButton').click(); // stop
        clearInterval(interval);
      }
    }, 50);
  });
});

Then('the progress bar value should be less than or equal to 25%', () => {
  cy.get('#progressBar')
    .invoke('attr', 'aria-valuenow')
    .then((value) => {
      expect(parseInt(value)).to.be.lte(25);
    });
});

When('the progress bar reaches 100%', () => {
  cy.get('#startStopButton').click(); // restart
  cy.get('#progressBar', { timeout: 10000 }).should(($bar) => {
    const value = parseInt($bar.attr('aria-valuenow'));
    expect(value).to.eq(100);
  });
});

Then('the progress bar is reset', () => {
  cy.get('#resetButton').click();
  cy.get('#progressBar')
    .invoke('attr', 'aria-valuenow')
    .should('eq', '0');
});
