const { Builder, By, until } = require('selenium-webdriver');
const { describe, it, after, before } = require('mocha');
const assert = require("assert");
const configs = require("./configs");
const { ConsoleLogEntry } = require('selenium-webdriver/bidi/logEntries');

describe('Test Signup', function() {
	this.timeout(30000);
	let driver;

	before(async () => {
		driver = await new Builder().forBrowser('chrome').build();
	});

	it('should Signup', async () => {
		await driver.get(configs.url);
		const firstPage = await driver.findElement(By.id('firstPage'))
				const shadowRoot = await driver.executeScript('return arguments[0].shadowRoot', firstPage);
				const signUpBtn = await shadowRoot.findElement(By.id('signUpBtn'))
				if (signUpBtn) {
						signUpBtn.click()
						const modalSignUp = await shadowRoot.findElement(By.id('modalSignUpComponent'))
						if (modalSignUp) {
								const signUpShadowRoot = await driver.executeScript('return arguments[0].shadowRoot', modalSignUp);
								const username = await signUpShadowRoot.findElement(By.id('usernameSignUp'))
								await username.sendKeys('testuser1')
								const password = await signUpShadowRoot.findElement(By.id('passwordSignUp'))
								await password.sendKeys('testPassword')
								const submit = await signUpShadowRoot.findElement(By.css('button[type="submit"]'))
								await submit.click()
								await driver.wait(until.urlContains('dashboard'), 10000);
						} else {
								return false
						}
				} else {
						return false
				}
				// console.error(signUpBtn)
		// assert.equal("Baby cadet", title);

		await driver.manage().setTimeouts({implicit: 500});
	});

	after(async () => {
		await driver.quit();
	});
});
