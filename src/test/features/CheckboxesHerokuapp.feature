@allure.label.suite:Checkboxes
@allure.label.epic:Herokuapp
@allure.label.story:Checkboxes_Functionality
@dragdrop

Feature: Checkboxes Functionality on Herokuapp

As a user of the Herokuapp, I want to be able to select and deselect the Checkboxes
on the page.

    Background:
        Given The user is on the Herokuapp Drag and Drop page

    @smoke @regression @sanity
    Scenario: The user will select and validate checkbox1
    When The user select the checkbox1
    Then The checkbox1 should be selected

    @smoke @regression @sanity
    Scenario: The user will  deselect and validate checkbox1
        When The user deselect the checkbox1
        Then The checkbox1 should be deselected

@smoke @regression @sanity
    Scenario: The user will deselect and validate checkbox2
        When The user deselect the checkbox2
        Then The checkbox2 should be deselected

    @smoke @regression @sanity
    Scenario: The user will select and validate checkbox2
        When The user select the checkbox2
        Then The checkbox2 should be selected

    @regression
    Scenario: The user will validate that when entering in the page /checkboxes, checkbox1 is unchecked and checkbox2 is checked
        When The user verified that  when entering in the page checkbox1 is unchecked and checkbox2 is checked