const { By, Key } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class HomePage extends BasePage {
  constructor(driver) {
    super(driver);
    this.closeLoginPopup = By.css('button._2KpZ6l._2doB4z');
    this.searchBox = By.name('q');
    this.firstProduct = By.css('a[href*="/p/"]'); // stable selector
  }

  async openHomePage() {
    await this.open('https://www.flipkart.com/');
  }

  async closePopupIfPresent() {
    try {
      await this.click(this.closeLoginPopup);
      console.log('Closed login popup');
    } catch {
      console.log('No login popup appeared');
    }
  }

  async searchProduct(productName) {
    await this.type(this.searchBox, productName);
    await this.driver.findElement(this.searchBox).sendKeys(Key.RETURN);
    console.log(`Searched for: ${productName}`);
  }

  async openFirstProduct() {
    await this.click(this.firstProduct);
    console.log('Opened first product');
  }
}

module.exports = HomePage;
