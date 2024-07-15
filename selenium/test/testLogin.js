const { Builder, By } = require('selenium-webdriver');
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
		const title = await driver.getTitle();
		assert.equal("Baby cadet", title);
		await driver.manage().setTimeouts({implicit: 500});
	});

	after(async () => {
		await driver.quit();
	});
});