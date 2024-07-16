const { Builder, By } = require('selenium-webdriver');
const { describe, it, after, before } = require('mocha');
const assert = require("assert");
const configs = require("./configs")
const {login, logout, testUser, friendRequest, friendRecommendNavigate} = require("./utils")

describe('Test friend request', function() {
	this.timeout(30000);
	let driver;

	before(async () => {
		driver = await new Builder().forBrowser('chrome').build();
	});

	it('should request friend', async () => {
		await driver.get(configs.url);
		const title = await driver.getTitle();
		assert.equal("Baby cadet first page", title);
		
        await login(driver, testUser)

		//navigate to friend recommend
		const friendRecommendComponent = friendRecommendNavigate(driver)
		const shadowRoot = await driver.executeScript('return arguments[0].shadowRoot', friendRecommendComponent)
		// cons

		await logout(driver)
	});

	after(async () => {
		await driver.quit();
	});
});
