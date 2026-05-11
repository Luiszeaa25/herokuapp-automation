@allure.label.suite:Checkboxes
@allure.label.epic:Herokuapp
@allure.label.story:Checkboxes_Functionality
@checkboxes
Feature: Checkboxes Functionality on Herokuapp

    As a user of the Herokuapp, I want to be able to select and deselect the
    Checkboxes on the page.

    Background:
        Given The user is on the Herokuapp Checkboxes page

    @smoke @regression @sanity
    Scenario: The user will select and validate checkbox1
        When The user selects checkbox1
        Then The checkbox1 should be selected

    @smoke @regression @sanity
    Scenario: The user will deselect and validate checkbox1
        When The user deselects checkbox1
        Then The checkbox1 should be deselected

    @smoke @regression @sanity
    Scenario: The user will deselect and validate checkbox2
        When The user deselects checkbox2
        Then The checkbox2 should be deselected

    @smoke @regression @sanity
    Scenario: The user will select and validate checkbox2
        When The user selects checkbox2
        Then The checkbox2 should be selected

    @regression
    Scenario: Validate default state of checkboxes on page load
        Then The checkbox1 should be unchecked and checkbox2 should be checked
