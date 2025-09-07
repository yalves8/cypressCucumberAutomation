Feature: API Challenge - DemoQA

  Scenario: Create user, authorize, list books and reserve
    Given that valid data exists to create a user
    When the user is created via API
    And an access token is generated
    And it is verified whether the user is authorized
    And the list of available books is consulted
    And both books are reserved for the user
    Then it is then validated that the user has both reserved books
