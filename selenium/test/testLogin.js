const { Builder, By, until } = require('selenium-webdriver');
const { describe, it, after, before } = require('mocha');
const assert = require("assert");
const configs = require("./configs")

describe('Test Login', function() {
	this.timeout(30000);
	let driver;

	before(async () => {
		driver = await new Builder().forBrowser('chrome').build();
	});

	it('should login', async () => {
		await driver.get(configs.url);

		for (const user of configs.users) {
			const firstPage = await driver.findElement(By.id('firstPage'))
			const shadowRoot = await driver.executeScript('return arguments[0].shadowRoot', firstPage);
			
			const signInBtn = await shadowRoot.findElement(By.id('signInBtn'))
			await signInBtn.click()

			const modalSignIn = await shadowRoot.findElement(By.id('modalLoginComponent'))
			const signInShadowRoot = await driver.executeScript('return arguments[0].shadowRoot', modalSignIn)

			const username = await signInShadowRoot.findElement(By.id('username'))
			await username.sendKeys(user.username)
			
			const password = await signInShadowRoot.findElement(By.id('password'))
			await password.sendKeys(user.password)

			const submitBtn = await signInShadowRoot.findElement(By.css('button[type="submit"]'))
			await submitBtn.click()
			await driver.wait(until.titleIs(`Baby cadet ${user.username}`), 10000);

			// logout
			const dashBoard = await driver.findElement(By.id('dashBoardComponent'))
			const dashBoardShadowRoot = await driver.executeScript('return arguments[0].shadowRoot', dashBoard)
			const profile = await dashBoardShadowRoot.findElement(By.id('profileComponent'))
			const profileShadowRoot = await driver.executeScript('return arguments[0].shadowRoot', profile)
			const logOutBtn = await profileShadowRoot.findElement(By.id('logOut'))
			await logOutBtn.click()
			await driver.wait(until.titleIs("Baby cadet first page"), 10000)
		}
	});

	after(async () => {
		await driver.quit();
	});
});
