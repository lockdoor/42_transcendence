const { Builder, By, until } = require('selenium-webdriver');
const { describe, it, after, before } = require('mocha');
const assert = require("assert");
const configs = require("./configs")
const { login, logout, profileNavigate } = require("./utils")

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

		await login(driver, {username: "pnamnil", password: "tontonton"})

		await profileNavigate(driver, "accountManagementLink", "Baby cadet acount management", "accountManagementComponent")
		await profileNavigate(driver, "notificationLink", "Baby cadet notification", "notificationComponent")
		await profileNavigate(driver, "statisticLink", "Baby cadet statistic", "statisticComponent")
		await profileNavigate(driver, "matchHistoryLink", "Baby cadet match history", "matchHistoryComponent")
		await profileNavigate(driver, "blockedListLink", "Baby cadet blocked list", "blockedListComponent")

		//friend navigate expect recommendFriendComponent
		const dashBoard = await driver.findElement(By.id('dashBoardComponent'))
		const dashBoardShadowRoot = await driver.executeScript('return arguments[0].shadowRoot', dashBoard)
		const friends = await dashBoardShadowRoot.findElement(By.id('friendsComponent'))
		const friendsShadowRoot = await driver.executeScript('return arguments[0].shadowRoot', friends)
		const friendRecommendBtn = await friendsShadowRoot.findElement(By.id('friendRecommendBtn'))
		await friendRecommendBtn.click()
		await driver.wait(until.titleIs("Baby cadet friend recommend"), 10000)
		await dashBoardShadowRoot.findElement(By.id("recommendFriendComponent"))


		await logout(driver)
	});

	after(async () => {
		await driver.quit();
	});
});
