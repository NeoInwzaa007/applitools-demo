const { Builder } = require('selenium-webdriver');
const { Eyes, Target } = require('@applitools/eyes-selenium');
const edge = require('selenium-webdriver/edge');

(async () => {
  const eyes = new Eyes();
  eyes.setApiKey('CgrkDXetw7r659sH7HIJkiF2QNk273LNUMGIMIfR7h0110'); // API Key

  let options = new edge.Options();

  let driver = new Builder().forBrowser('MicrosoftEdge').setEdgeOptions(options).build();

    try {
    await driver.get('https://f1std5-demo9009-o2c.thailanderp.com/Sales/SaleOrderCRMND1.aspx');
    
    // 1. กรอก Username
    await driver.findElement(By.id('txtUsername')).sendKeys('YOUR_USERNAME');
    
    // 2. กรอก Password
    await driver.findElement(By.id('txtPassword')).sendKeys('YOUR_PASSWORD');

    await driver.findElement(By.id('btnLogin')).click();

    await driver.wait(until.elementLocated(By.id('menuOrPageAfterLogin')), 10000);

    await eyes.open(driver, 'My App', 'Menu Visual Test');
    console.log("eyes.open OK");

    await eyes.check('MenuPage', Target.window());
    await eyes.close();
    console.log("eyes.close OK");
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await driver.quit();
    await eyes.abortIfNotClosed();
  }
})();