Feature: Progress Bar Widget
  As a user
  I want to interact with the Progress Bar widget
  So that it can be started, stopped, and reset correctly

Scenario: Start, stop at 25%, complete, and reset the progress bar
    Given the DemoQA website is open
    When the "Widgets" section is accessed
    And the "Progress Bar" submenu is clicked
    And the "Start" button is clicked
    And the progress bar is stopped before reaching 25%
    Then the progress bar value should be less than or equal to 25%
    When the "Start" button is clicked
    And the progress bar reaches 100%
    Then the progress bar is reset