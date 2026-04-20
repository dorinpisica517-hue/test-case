Feature: Amazon Shopping Cart Management
  As a customer
  I want to search for products and manage my shopping cart
  So that I can purchase items efficiently

  @smoke @critical @shopping
  Scenario: Complete shopping workflow with cheapest products
	  Given I am on the Amazon homepage
    When I search for "Snickers" candy bars
    Then I should see search results containing "Snickers"
    And I sort the results by price from low to high
    And I select and add the cheapest Snickers to my shopping cart

    When I search for "Skittles" candy
    Then I should see search results containing "Skittles"
    And I sort the results by price from low to high
    And I select and add the cheapest Skittles to my shopping cart

    Then my shopping cart should contain 2 items
    And I proceed to checkout
    Then I should be redirected to the login/registration page
    And I should see options to sign in or create an account