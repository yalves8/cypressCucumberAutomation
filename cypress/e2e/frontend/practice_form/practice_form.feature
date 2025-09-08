Feature: Completing the Practice Form
  As a user
  I want to interact with the Practice Form
  So that it can be fill the form and submit

  Scenario: Fill out and submit the form with random data
    Given the DemoQA website is open
    When the "Forms" option is accessed
    And the "Practice Form" submenu is clicked
    And the entire form is filled with random values
    And the form is sent
    Then the confirmation popup opens
    And close the popup
