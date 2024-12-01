Feature: Agify API Testing

  Scenario Outline: Get age for the name - input first name only
    Given I send a GET request to agify API for name "<Name>"
    When the response status is 200
    Then the response should contain the field "name" with value "<Name>"
    And the response should contain the field "age"

    Examples:
      | Name  |
      | alice |
      | Jonh  |

  Scenario Outline: Get age for the name - input full name
    Given I send a GET request to agify API for name "<Name>"
    When the response status is 200
    Then the response should contain the field "name" with value "<Name>"
    And the response should contain the field "age"

    Examples:
      | Name                |
      | Pavani Chappa       |
      | Jonh Doe  Alexander |

  Scenario Outline: Get age for the name - input name with diacritics
    Given I send a GET request to agify API for name "<Name>"
    When the response status is 200
    Then the response should contain the field "name" with value "<Name>"
    Then the response should contain the field "age"

    Examples:
      | Name        |
      | José        |
      | María André |

  Scenario Outline: Get age for the name - input invalid name parameter
    Given I send a GET request to agify API for name "<Name>"
    When the response status is 422
    Then the response should contain the field "error"
    And the error message should contain "Invalid 'name' parameter"

    Examples:
      | Name |
      |      |
      |  123 |

  Scenario: Missing Name Parameter
    Given I send a GET request to agify API with no name parameter
    When the response status is 422
    Then the response should contain the field "error"
    And the error message should contain "Missing 'name' parameter"

  Scenario: Unsupported HTTP Method
    Given I send a POST request to agify API for name "alice"
    When the response status is 405
    Then the response should contain the field "error"
    And the error message should contain "Method Not Allowed"
  
  # Scenario: Exceeding Rate Limit
  # #The API is rate-limited to 100 requests per day. It will return a 429 status code if the limit is exceeded.
  #   Given I make 101 requests concurrently to the Agify API in a day
  #   Then the response status is 429
  #   And the response should contain the field "error"
  #   And the error message should contain "Request limit reached"

# NOTE: Commenting out the security tests as my system has RAV end point protection enabled
# and it blocks the request with SQL Injection and XSS payloads and XSS payloads.
  
  # Scenario: Security Test - SQL Injection
  #   Given I make a request to the Agify API with the name parameter containing "' OR 1=1 --"
  #   Then the response status code should be 400
  #   And the response body should not expose any database error message
 
  # Scenario: Security Test - Cross-Site Scripting (XSS)
  #   #Testing for XSS by injecting JavaScript in the name parameter
  #   Given I make a request to the Agify API with the name parameter containing "<script>alert('XSS')</script>"
  #   Then the response status code should be 200
  #   And the response body should not contain the injected script

  Scenario: Security Test - Invalid API Key
    Given I make a request to the Agify API without a valid API key
    Then the response status code should be 401
    And the response should contain the field "error"
    And the error message should contain "Invalid API key"

  Scenario: Performance Test-Response Time for Single Request
  /*For the sake of this test, we are setting the threshold to 1000 milliseconds. 
    There are no strict rules for this threshold in API specifications.*/

    Given I send a GET request to agify API for name "alice"
    When the response status is 200
    Then the response time should be less than 1000 milliseconds
