const { Builder, By, until } = require('selenium-webdriver');
const { describe, it, after, before } = require('mocha');
const assert = require("assert");
const configs = require("./configs")
const { login, logout, profileNavigate, friendRecommendNavigate, testUser } = require("./utils")

describe('Test Main Frame', function() {
	this.timeout(30000);
	let driver;

	before(async () => {
		driver = await new Builder().forBrowser('chrome').build();
	});

	it('should change main frame collectly', async () => {
		await driver.get(configs.url);
		const title = await driver.getTitle();
		assert.equal("Baby cadet first page", title);

		await login(driver, testUser)

		await profileNavigate(driver, "accountManagementLink", "Baby cadet acount management", "accountManagementComponent")
		await profileNavigate(driver, "notificationLink", "Baby cadet notification", "notificationComponent")
		await profileNavigate(driver, "statisticLink", "Baby cadet statistic", "statisticComponent")
		await profileNavigate(driver, "matchHistoryLink", "Baby cadet match history", "matchHistoryComponent")
		await profileNavigate(driver, "blockedListLink", "Baby cadet blocked list", "blockedListComponent")

		await friendRecommendNavigate(driver)

		await logout(driver)
	});

	after(async () => {
		await driver.quit();
	});
});
