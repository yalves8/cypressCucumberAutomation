Feature: Web Tables Management on DemoQA

  Scenario: Create, edit, and delete a single record
    Given the DemoQA website is open
    When the "Elements" section is accessed
    And the "Web Tables" submenu is clicked
    And a new record is created with random data
    Then the new record should appear in the table
    When the record is edited with new random data
    Then the changes should be visible in the table
    When the record is deleted
    Then the record should no longer exist in the table


