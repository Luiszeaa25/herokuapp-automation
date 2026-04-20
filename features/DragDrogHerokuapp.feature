
Feature:  Drag and Drop Functionality on Herokuapp

    As a user of the Herokuapp, I want to be able to drag and drop elements on
    the page.

    Background:
        Given The user is on the Herokuapp Drag and Drop page

    Rule: Drag and Drop functionality
        @Smoke @regression @sanity
        Scenario: Drag and Drop element A to element B

            When The user drags element A and drops it on element B
            Then Element A should be located at the position of element B
            And Element B should be located at the position of element A

        Scenario: Drag and Drop element A to element B and then back to original position

            When The user drags element A and drops it back to its original position
            Then Element A should be located at its original position
            And Element B should be located at its original position

        Scenario: Drag and Drop element B to element A

            When The user drags element B and drops it on element A
            Then Element B should be located at the position of element A
            And Element A should be located at the position of element B


        Scenario: Drag and Drop element B to element A and then back to original position

            When The user drags element B and drops it back to its original position
            Then Element B should be located at its original position
            And Element A should be located at its original position

    Rule: Invalid Drag and Drop attempts
        Scenario: Drag and Drop element A to an invalid location

            When The user drags element A and drops it on an invalid location
            Then Element A should remain in its original position
            And Element B should remain in its original position

        
        Scenario: Drag and Drop element B to an invalid location

            When The user drags element B and drops it on an invalid location
            Then Element B should remain in its original position
            And Element A should remain in its original position