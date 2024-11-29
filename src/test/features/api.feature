 Feature: Agify API Testing

  Scenario Outline: Get age for the name - positive Scenarios
    Given I send a GET request to agify API for name "<Name>"
    When the response status is 200
    Then the response should contain the field "age"
    And the age should be "<Age>"

    Examples:
      | Name                | Age |
      | alice               |  56 |
      | BOB                 |  70 |
      | Jonh Doe  Alexander |  55 |
      | g                   |  64 |

  Scenario Outline: Get age for the name - negative Scenarios
    Given I send a GET request to agify API for name "<Name>"
    When the response status is 200
    Then the response should contain the field "age"
    And the age should be "<Age>"

    Examples:
      | Name                                                          | Age  |
      |                                                      13243245 | null |
      |                                                               | null |
      | frankjhgjgjhkjguyhfygfdgfchfuygjbvjhfthfgchgvhjyujgkjgfuthfhg | null |
      | @!$%^                                                         | null |

  Scenario: Missing Name Parameter
    Given I send a GET request to agify API with no name parameter
    When the response status is 422
    Then the response should contain the field "error"

  Scenario: Response Time for Single Request-Performance Testing
    Given I send a GET request to agify API for name "alice"
    When the response status is 200
    Then the response time should be less than 1000 milliseconds

  Scenario: Response Time for Multiple Requests
    Given I make 500 requests to the Agify API with various names
    Then the average response time should be less than 300ms

  Scenario: Load Testing with Bulk Requests
  # this test fails because the API is rate-limited. It will return 429 status code
    Given I make 500 requests concurrently to the Agify API
    Then the system should handle all requests without crashing or significant delay
    And the response status code for all requests should be 200

  Scenario: Stress Testing
  #Sending 10000 requests in a short time period should result in a rate-limit error or controlled failure
    Given I send 10000 requests to the Agify API in 10 seconds
    Then the response status code should be 429
    And the response should contain "Request limit reached"
    
############################   TODO   ###########################################
    # Scenario:Security Test - SQL Injection
    # Given I make a request to the Agify API with the name parameter containing a SQL injection payload "' OR 1=1 --"
    # Then the response status code should be 400
    # And the response body should not expose any database error message

#     Scenario: Security Test - Cross-Site Scripting (XSS)
#     #Testing for XSS by injecting JavaScript in the name parameter
#     Given I make a request to the Agify API with the name parameter containing "<script>alert('XSS')</script>"
#     Then the response status code should be 200
#     And the response body should not contain the injected script

#   Scenario: Security Test - Sensitive Data Exposure
#   #Ensure that sensitive information is not exposed in the response
#     Given I make a request to the Agify API with a name parameter
#     Then the response body should not contain any sensitive or personal data (e.g., email, IP address, etc.)
    
#   Scenario: Security Test - Authentication and Authorization
#   #Sending an API request without proper authentication should return an error
#     Given I make a request to the Agify API without a valid API key
#     Then the response status code should be 401 (Unauthorized)
#     And the response body should contain a message indicating that authentication is required



