@Module_Authentication @Project-LoginPageHerokuapp @Owner-LuisZea
Feature: Login Page Herokuapp

    As a registered user I want to authenticate into the Herokuapp application
    so that I can access protected resources based on valid credentials.

    Background:
        Given The user is on the Herokuapp LoginPage

    @critical @P1
    Rule: Authentication with valid credentials

        @sanity @smoke @regression
        Scenario Outline: login validation - valid login

            When The user enters "<username>" and "<password>" and clicks on the login button
            Then The user should see a success message
            And The user should be redirected to the home page

            Examples:
                | username | password             |
                | tomsmith | SuperSecretPassword! |

    @High @P2 @Negative
    Rule: Authentication with invalid credentials

        @sanity
        Scenario Outline: login validation - invalid login - sanity

            When The user enters "<username>" and "<password>" and clicks on the login button
            Then The user should see "<errorType>" error message

            Examples:
                | username    | password    | errorType          |
                | invalidUser | invalidPass | invalidCredentials |

        @regression
        Scenario Outline: login validation - invalid login - regression

            When The user enters "<username>" and "<password>" and clicks on the login button
            Then The user should see "<errorType>" error message

            Examples:
                | username    | password             | errorType          |
                | invalidUser | invalidPass          | invalidCredentials |
                | tomsmith    | invalidPass          | invalidPassword    |
                | invalidUser | SuperSecretPassword! | invalidUsername    |

    @High @P2 @Negative
    Rule: Authentication with empty credentials

        @sanity
        Scenario Outline: login validation - empty login - sanity

            When The user enters "<username>" and "<password>" and clicks on the login button
            Then The user should see "<errorType>" error message

            Examples:
                | username | password | errorType            |
                |          |          | emptyUsernameAndPass |

        @regression
        Scenario Outline: login validation - empty login - regression

            When The user enters "<username>" and "<password>" and clicks on the login button
            Then The user should see "<errorType>" error message

            Examples:
                | username    | password             | errorType                |
                |             |                      | emptyUsernameAndPass     |
                |             | SuperSecretPassword! | emptyUsername            |
                | tomsmith    |                      | emptyPassword            |
                | invalidUser |                      | emptyPasswordInvalidUser |
                |             | invalidPass          | emptyUsername            |