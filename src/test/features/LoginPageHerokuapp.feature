@allure.label.suite:Login
@allure.label.epic:Herokuapp
@allure.label.story:Login Functionality
@login
Feature: Login Functionality on Herokuapp

    As a user of the Herokuapp, I want to be able to login to the application.

    Background:
        Given The user is on the Herokuapp LoginPage

    Rule: Login functionality

        @smoke @regression @sanity
        Scenario Outline: Successful login with valid credentials

            When The user enters "<username>" and "<password>" and clicks on the login button
            Then The user should see a success message
            And The user should be redirected to the home page

            Examples:
                | username | password             |
                | tomsmith | SuperSecretPassword! |

        @smoke @regression @sanity
        Scenario Outline: Failed login with invalid credentials

            When The user enters "<username>" and "<password>" and clicks on the login button
            Then The user should see "<errorType>" error message

            Examples:
                | username | password              | errorType              |
                | invalid  | SuperSecretPassword!  | invalidUsername        |
                | tomsmith | wrongpassword         | invalidPassword        |
                |          |                       | emptyUsernameAndPass   |
                |          | SuperSecretPassword!  | emptyUsername          |
                | tomsmith |                       | emptyPassword          |
                | invalid  |                       | emptyPasswordInvalidUser |
