const { Builder, By, until } = require('selenium-webdriver');
const { Eyes, Target } = require('@applitools/eyes-selenium');
const edge = require('selenium-webdriver/edge');

(async () => {
  const eyes = new Eyes();
  eyes.setApiKey('');

  let options = new edge.Options();
  let driver = new Builder().forBrowser('MicrosoftEdge').setEdgeOptions(options).build();

 try {
    console.log("Open login page");
    await driver.get('https://apps.thailanderp.com/login');
await driver.sleep(2000);

    await driver.wait(until.elementLocated(By.tagName('iframe')), 10000);
    const iframe = await driver.findElement(By.tagName('iframe'));
    await driver.switchTo().frame(iframe);

    await driver.wait(until.elementLocated(By.name('username')), 10000);
    await driver.findElement(By.name('username')).sendKeys('');
    await driver.findElement(By.name('password')).sendKeys('');
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.switchTo().defaultContent();
    await driver.wait(until.urlContains('/feed-task'), 10000);

    await driver.get('https://apps.thailanderp.com/user-applications-redesign');
    await driver.wait(until.urlContains('/user-applications-redesign'), 10000);
    await driver.sleep(2000);

    const demoBtn = await driver.wait(
    until.elementIsVisible(driver.findElement(By.xpath("//*[contains(text(),'DEMO 9009 - TRADE-PERPETUAL')]"))),
    10000
    );
    await demoBtn.click();
    await driver.sleep(3000);

    const allOrderBtns = await driver.findElements(By.xpath(
    "//*[contains(normalize-space(.), 'ORDER-TO-COLLECTION SYSTEM')]"
    ));
    console.log("พบ order btns:", allOrderBtns.length);
     let orderBtn = null;
    if (allOrderBtns.length > 0) {
    for (const btn of allOrderBtns) {
    const text = await btn.getText();
    const tag = await btn.getTagName();
    console.log(`<${tag}>: "${text}"`);
  }
    orderBtn = allOrderBtns[0];
    await orderBtn.click();
    await driver.sleep(1500);
}   else {
    throw new Error('หา ORDER-TO-COLLECTION SYSTEM ไม่เจอ!');
}
   
    const handlesBefore = await driver.getAllWindowHandles();

    await orderBtn.click();

    await driver.wait(async () => {
    const handlesAfter = await driver.getAllWindowHandles();
    return handlesAfter.length > handlesBefore.length;
    }, 50000);

    const handlesAfter = await driver.getAllWindowHandles();
    const newTabHandle = handlesAfter.find(h => !handlesBefore.includes(h));

    await driver.switchTo().window(newTabHandle);
    await driver.wait(until.urlContains('LandingMenu.aspx'), 50000);
    await driver.get('https://f1std5-demo9009-o2c.thailanderp.com/Sales/SaleOrderCRMND1.aspx');
    await driver.findElements(By.xpath("//*[contains(text(),'Sales Order')]"))

    await eyes.open(driver, 'My App', 'SaleOrder Visual Test');
    await eyes.check('SaleOrderPage', Target.window());
    await eyes.close();
    console.log("Test complete!");
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await driver.quit();
    await eyes.abortIfNotClosed();
  }
})();