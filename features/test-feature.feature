
Feature: test-feature: Verification of calculator work

  Background:
    Given User prints comment "User navigates to the Calculator page"
    When User navigates to the Calculator page
    Then Page title is equal to "Super Calculator"

  Scenario: 1: Verify Data Connector users
    Given User verifies his profile on "DATA_CONNECTOR"
    When User enters 1 in field "first"
    When User enters 2 in field "second"
    When User clicks Go Button "gobutton"
    Then History "result in memory" is equal to 1
    When User enters 3 in field "first"
    When User enters 4 in field "second"
    When User clicks Go Button "gobutton"
    Then History "result in memory" is equal to 2
    When User enters 5 in field "first"
    When User enters 6 in field "second"
    When User clicks Go Button "gobutton"
    # Here is an error
    Then History "result in memory" is equal to 2
