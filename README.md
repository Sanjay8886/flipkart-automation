# Flipkart Automation

End-to-end Flipkart automation using Selenium WebDriver with Node.js, Mocha, and Chai. Features include searching products, handling login popups, opening products in modal or new tab, adding to cart with dynamic element detection, and verifying items in the cart.

## Features

- Open Flipkart home page and handle login popups  
- Search for products (e.g., laptops)  
- Open first product (modal or new tab)  
- Add product to cart using robust element detection  
- Verify product presence in cart  
- Built with Page Object Model (POM) for maintainability  
- Mocha + Chai for test framework  
- Handles dynamic content and changing selectors  

## Installation

```bash
git clone https://github.com/Sanjay8886/flipkart-automation.git
cd flipkart-automation
npm install
```
# Usage

Run the automation tests using Mocha:
```bash
npx mocha test/flipkartTest.js --timeout 70000
```

This will:

- Open Flipkart homepage
- Close login popup if present
- Search for a product (e.g., laptop)
- Open the first product (modal or new tab)
- Add the product to the cart
- Verify the product is present in the cart

# Future Enhancements

- Add multiple product searches and cart verification
- Validate product price, quantity, and details in the cart
- Implement data-driven testing
- Add cross-browser testing (Chrome, Firefox, Edge)
- Add reporting with screenshots for failed tests
