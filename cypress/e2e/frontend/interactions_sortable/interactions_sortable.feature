Feature: Sortable elements ordering
  As a user
  I want to interact with the Sortable component
  So that it can be displayed in ascending order
  
  Scenario: User sorts the elements in ascending order
      Given the DemoQA website is open
      When the "Interactions" section is accessed
      And the "Sortable" submenu is clicked
      And the user sorts the list items in ascending order
      Then the list items should be displayed in ascending order
