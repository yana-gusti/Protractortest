Feature: Calculator testing

  Background:
    Given User prints comment "User navigates to the Calculator page"
    When User navigates to the Calculator page with url "MAIN"
    Then Page title is equal to "Super Calculator"

  Scenario: 1: Verify calculator
    When User enters 1 in field "mainPage|firstField"
    When User selects "+" from dropdown "select"
    When User enters 2 in field "mainPage|secondField"
    When User clicks Go Button "#gobutton"
    Then History "result memory" is equal to 0
    When User enters 3 in field "mainPage|firstField"
    When User enters 4 in field "mainPage|secondField"
    When User clicks Go Button "#gobutton"
    When User enters 5 in field "mainPage|firstField"
    When User enters 6 in field "mainPage|secondField"
    When User clicks Go Button "#gobutton"
    Then Table "[class='table']" contains data:
      | Expression | Result |
      | 5 + 6      | 11     |
      | 3 + 4      | 7      |
      | 1 + 2      | 3      |
    Then Table "[class='table']" match data:
      | Expression | Result |
      | 5 + 6      | 11     |
      | 3 + 4      | 7      |
      | 1 + 2      | 3      |