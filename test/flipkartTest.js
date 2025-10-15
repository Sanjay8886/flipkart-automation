const { Builder } = require('selenium-webdriver');
require('chromedriver');
const { expect } = require('chai');

const HomePage = require('../pages/HomePage');
const ProductPage = require('../pages/ProductPage');

describe('Flipkart Functional Test', function() {
  this.timeout(70000);
  let driver, homePage, productPage;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    homePage = new HomePage(driver);
    productPage = new ProductPage(driver);
  });

  after(async function() {
    await driver.quit();
  });

  it('should search, open product, add to cart and verify', async function() {
    await homePage.openHomePage();
    await homePage.closePopupIfPresent();
    await homePage.searchProduct('laptop');
    await homePage.openFirstProduct();

    await productPage.switchToProductTab();
    await productPage.addToCart();

    const inCart = await productPage.verifyProductInCart();
    expect(inCart).to.be.true;
  });
});
