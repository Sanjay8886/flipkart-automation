const { until } = require('selenium-webdriver');

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async open(url) {
    await this.driver.get(url);
    await this.driver.manage().window().maximize();
  }

  async click(selector) {
    const element = await this.driver.wait(until.elementLocated(selector), 15000);
    await element.click();
  }

  async type(selector, text) {
    const element = await this.driver.wait(until.elementLocated(selector), 15000);
    await element.sendKeys(text);
  }

  async waitForElement(selector, timeout = 15000) {
    await this.driver.wait(until.elementLocated(selector), timeout);
  }

  async switchToWindow(index) {
    const windows = await this.driver.getAllWindowHandles();
    if (windows.length > index) {
      await this.driver.switchTo().window(windows[index]);
    }
  }

  async scrollBy(y) {
    await this.driver.executeScript(`window.scrollBy(0, ${y});`);
  }
}

module.exports = BasePage;
