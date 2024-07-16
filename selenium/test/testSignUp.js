const { Builder, By, until } = require('selenium-webdriver');
const { describe, it, after, before } = require('mocha');
// const assert = require("assert");
const configs = require("./configs");
const {signup, logout} = require("./utils")

describe('Test Signup', function() {
	this.timeout(30000);
	let driver;

	before(async () => {
		driver = await new Builder().forBrowser('chrome').build();
	});

	it('should Signup', async () => {
		await driver.get(configs.url);
		for (const user of configs.users) {
			await signup(driver, user)
			await logout(driver)
		}
	});

	after(async () => {
		await driver.quit();
	});
});
