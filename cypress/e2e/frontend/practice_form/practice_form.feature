Feature: Completing the Practice Form

  Scenario: Fill out and submit the form with random data
    Given that the DemoQA home page is accessed
    When the "Forms" option is accessed
    And the "Practice Form" submenu is clicked
    And the entire form is filled with random values
    And the form is sent
    Then the confirmation popup opens
    And close the popup
