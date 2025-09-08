import {  When, Then } from "@badeball/cypress-cucumber-preprocessor";
import 'cypress-real-events/support';

When('the user sorts the list items in ascending order', () => {
  const order = ["One", "Two", "Three", "Four", "Five", "Six"];

  order.forEach((item, index) => {
    if (index > 0) {
      cy.contains('.vertical-list-container .list-group-item', item)
        .realMouseDown()
        .realMouseMove(0, -(index * 50)) 
        .realMouseUp();
    }
  });
});

Then('the list items should be displayed in ascending order', () => {
  const expected = ["One", "Two", "Three", "Four", "Five", "Six"];

  cy.get('.vertical-list-container .list-group-item').then(($items) => {
    const actual = [...$items].map((el) => el.innerText.trim());
    expect(actual).to.deep.eq(expected);
  });
});
