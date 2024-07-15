const { Builder, By, until } = require('selenium-webdriver');
const { describe, it, after, before } = require('mocha');
const assert = require("assert");
const configs = require("./configs");

describe('Test Signup', function() {
	this.timeout(30000);
	let driver;

	before(async () => {
		driver = await new Builder().forBrowser('chrome').build();
	});

	it('should Signup', async () => {
		await driver.get(configs.url);

		for (const user of configs.users) {

			const firstPage = await driver.findElement(By.id('firstPage'))
			const shadowRoot = await driver.executeScript('return arguments[0].shadowRoot', firstPage);
			
			const signUpBtn = await shadowRoot.findElement(By.id('signUpBtn'))
			signUpBtn.click()
					
			const modalSignUp = await shadowRoot.findElement(By.id('modalSignUpComponent'))
			const signUpShadowRoot = await driver.executeScript('return arguments[0].shadowRoot', modalSignUp);
			
			const username = await signUpShadowRoot.findElement(By.id('usernameSignUp'))
			await username.sendKeys(user.username)
			
			const password = await signUpShadowRoot.findElement(By.id('passwordSignUp'))
			await password.sendKeys(user.password)

			const avatar = await signUpShadowRoot.findElement(By.id('avatarSignUp'))
			await avatar.sendKeys(user.avatar)
			
			const submit = await signUpShadowRoot.findElement(By.css('button[type="submit"]'))
			await submit.click()
			
			await driver.wait(until.urlContains('dashboard'), 10000);
			// await driver.manage().setTimeouts({implicit: 500});

			// logout
			const dashBoard = await driver.findElement(By.id('dashBoardComponent'))
			const dashBoardShadowRoot = await driver.executeScript('return arguments[0].shadowRoot', dashBoard)
			const profile = await dashBoardShadowRoot.findElement(By.id('profileComponent'))
			const profileShadowRoot = await driver.executeScript('return arguments[0].shadowRoot', profile)
			const logOutBtn = await profileShadowRoot.findElement(By.id('logOut'))
			await logOutBtn.click()
			await driver.wait(until.titleIs("Baby cadet first page"), 10000);
		}
	});

	after(async () => {
		await driver.quit();
	});
});
