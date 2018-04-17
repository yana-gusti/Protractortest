@Regression
Feature: test-feature

  Background:
    Given User prints comment "User navigates to the Calculator page"
    When User navigates to the Calculator page with url "calculatorPage|url"
    Then Page title is equal to "Super Calculator"

  Scenario: 1: Verify calculator
    When User enters 1 in "first" field
    When User selects "+" from dropdown "select"
    When User enters 2 in "second" field
    When User clicks Go Button "gobutton"
#    Then Result "h2" is equal to "3"
    Then History "result memory" is equal to 0
    When User enters 3 in field "first"
    When User enters 4 in field "second"
    When User clicks Go Button "gobutton"
#    Then History "result in memory" is equal to 2
    When User enters 5 in field "first"
    When User enters 6 in field "second"
    When User clicks Go Button "gobutton"
#    Then Table cell "tbody tr td" with text "3" is displayed
    # Here is an error
#    Then History "result in memory" is equal to 3
    Then Table "[class='table']" match data:
      | Time | Expression | Result |
      | 12   | 2          | t      |
      | 13   | 3          | 3      |
      | 14   | 4          | 5      |