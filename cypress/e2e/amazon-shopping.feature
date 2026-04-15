Feature: Amazon Shopping - Search and Basket Verification
  As a new Amazon user
  I want to search for products and verify basket calculations
  So that I can confirm the checkout process works correctly

  Background:
    Given I navigate to Amazon homepage
    And I accept cookies if prompted

  @smoke @critical
  Scenario: Search for cheapest snacks and add to basket
    When I search for "Snickers"
    Then I should see search results for "Snickers"
    And I find and note the cheapest product price
    When I add the cheapest product to basket
    Then the product should be added to basket
    And basket count should update to 1

  @smoke @critical
  Scenario: Add multiple products and verify basket total
    Given the basket is empty
    When I search for "Snickers"
    And I add the cheapest product to basket
    And I search for "Skittles"
    And I add the cheapest product to basket
    Then basket count should update to 2
    And basket total should be calculated correctly

  @critical @regression
  Scenario: Verify checkout redirects to registration for new users
    Given the basket contains at least 1 product
    When I proceed to checkout
    Then I should be redirected to registration page
    And I should see login/registration options

  @accessibility @regression
  Scenario: Verify proper navigation back to shopping
    When I search for "Snickers"
    And I add the cheapest product to basket
    And I navigate back to search
    Then I should return to Snickers search results
    And basket count should still be 1
