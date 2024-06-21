const { By, Builder } = require('selenium-webdriver');
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");

const expectedFirstPlayerIcon = "×";
const errorIcon = "playerText";

(async function gameIconTest() {

  // Set Chrome option
  let options = new chrome.Options();
  options.addArguments('headless');
  options.addArguments('disable-gpu');
  options.setChromeBinaryPath('/usr/bin/google-chrome');

  let driver;

  try {
    driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
    await driver.get('http://54.196.103.148/');

    // Maximize the window
    driver.manage().window().maximize();
    await driver.manage().setTimeouts({ implicit: 500 });

    // Create the first window element
    let gamePreferencesWindow = await driver.findElement(By.className('modal-content'));
    let playBtn = await driver.findElement(By.id('okBtn'));

    // Click on the play button 
    await playBtn.click();

    // Start the game putting the expected X in the superior left corner
    let gameCell = await driver.findElement(By.id('cell0'));
    await gameCell.click();
    let firstPlayerIcon = await gameCell.getText();

    // Log the actual icon text
    console.log('First player icon:', firstPlayerIcon);

    // Assert the game cell should not contain the error icon
    if(!firstPlayerIcon.includes(errorIcon)){
      console.log("Test Success");
    }
    else{
      console.log("Test Failed")
    }

  } catch (e) {
    console.error('An error occurred: ', e);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}());
