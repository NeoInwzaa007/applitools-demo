const { Builder } = require('selenium-webdriver');
const { Eyes, Target } = require('@applitools/eyes-selenium');
const edge = require('selenium-webdriver/edge');

(async () => {
  const eyes = new Eyes();
  eyes.setApiKey('CgrkDXetw7r659sH7HIJkiF2QNk273LNUMGIMIfR7h0110'); // API Key

  let options = new edge.Options();

  let driver = new Builder().forBrowser('MicrosoftEdge').setEdgeOptions(options).build();

  try {
    await driver.get('https://f1std5-demo9009-o2c.thailanderp.com/Sales/SaleOrderCRMND1.aspx'); // WEB PATH
    await eyes.open(driver, 'My App', 'Homepage Visual Test');
    console.log("eyes.open OK");

    await eyes.check('Homepage', Target.window());
    await eyes.close();
    console.log("eyes.close OK");
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await driver.quit();
    await eyes.abortIfNotClosed();
  }
})();