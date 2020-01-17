Feature: Wiki page title testing
  Background:
    Given User prints comment "mainPage:comment"

  Scenario: Check title
    When User navigates to the Wiki page with url "WIKI"
    Then Page title is equal to "mainPage:pageTitle"
    When User waits 4 seconds
    Then Article "wikiPage|todayText" with text "REGEXP:mainPage:todayText" is displayed
    And Article "wikiPage|todayText" with text "mainPage:todayText" is displayed