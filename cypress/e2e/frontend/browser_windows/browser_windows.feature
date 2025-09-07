Feature: Browser Windows

  Scenario: Open a new browser window and validate content
    Given the DemoQA website is open
    When the "Alerts, Frame & Windows" section is accessed
    And the main menu submenu "Browser Windows" is clicked
    And the "New Window" button is clicked
    Then a new window should be opened
    And the new window should display the text "This is a sample page"
    And the new window is closed