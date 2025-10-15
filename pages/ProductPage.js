const { By, until } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class ProductPage extends BasePage {
  constructor(driver) {
    super(driver);
    // Multiple selectors for Add to Cart
    this.addToCartSelectors = [
      // Text-based, case-insensitive
      By.xpath("//button[contains(translate(text(),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ'), 'ADD TO CART')]"),
      // Class-based fallback (partial match)
      By.xpath("//button[contains(@class, 'QqFHMw')]")
    ];
    // Cart product link
    this.cartProduct = By.css('a[href*="/p/"]');
  }

  async switchToProductTab() {
    const windows = await this.driver.getAllWindowHandles();
    if (windows.length > 1) {
      await this.driver.switchTo().window(windows[1]);
      console.log('Switched to product tab');
    } else {
      console.log('Product opened in same tab/modal');
      // wait for modal content to render
      await this.driver.sleep(2000);
    }
  }

  async addToCart() {
    // Scroll to make sure button loads
    await this.scrollBy(500);

    let buttonElement = null;

    for (let selector of this.addToCartSelectors) {
      try {
        buttonElement = await this.driver.wait(until.elementLocated(selector), 10000);
        if (await buttonElement.isDisplayed()) break;
      } catch {
        continue;
      }
    }

    if (!buttonElement) {
      throw new Error('Add to Cart button not found! Product might be out of stock.');
    }

    // Scroll into view and click
    await this.driver.executeScript("arguments[0].scrollIntoView(true);", buttonElement);
    await buttonElement.click();
    console.log('✅ Product added to cart');
  }

  async verifyProductInCart() {
    await this.open('https://www.flipkart.com/viewcart?otracker=cart');
    await this.waitForElement(this.cartProduct);
    console.log('Verified product in cart');
    return true;
  }
}

module.exports = ProductPage;
