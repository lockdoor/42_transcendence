const { By } = require('selenium-webdriver');
const { sleep, elementDisappear, login, logout, profileNavigate } = require("./utils")
const configs = require("./configs") 
const assert = require("assert");

testFriendBlocked = async (driver) => {
	await login(driver, configs.users[0])

	const dashBoardComponent = await driver.findElement(By.id("dashBoardComponent"))
	const dashBoardShadowRoot = await driver
		.executeScript('return arguments[0].shadowRoot', dashBoardComponent)
	const friendsComponent = dashBoardShadowRoot.findElement(By.id("friendsComponent"))
	const friendsShadowRoot = await driver
		.executeScript('return arguments[0].shadowRoot', friendsComponent)
	const friendTableBody = await friendsShadowRoot.findElement(By.id("friendTableBody"))
	
	const trElement = await friendTableBody.findElements(By.css("tr"))
	const friendCount = trElement.length

	// block
	for (let i = 0; i < friendCount; i++) {
		const trEl = await friendTableBody.findElements(By.css("tr"))
		const friendName = await trEl[0].getAttribute("id")
		const friendProfileBtn = await trEl[0].findElement(By.id(`${friendName}ProfileBtn`))
		await friendProfileBtn.click()

		await sleep(configs.timeWait)
		const friendProfileComponent = await dashBoardShadowRoot.findElement(By.id("friendProfileComponent"))
		const friendProfileShadowRoot = await driver
			.executeScript('return arguments[0].shadowRoot', friendProfileComponent)
		const usernameEl = await friendProfileShadowRoot.findElement(By.id("username"))
		const username = await usernameEl.getText()
		assert.equal (friendName, username, "friend profile should show in mainframe")

		const blockBtn = await friendProfileShadowRoot.findElement(By.id("blockBtn"))
		await blockBtn.click()
		await sleep(configs.timeWait)
		await elementDisappear(friendTableBody, `${friendName}ProfileBtn`)
		await dashBoardShadowRoot.findElement(By.id("blockedListComponent"))
	}

	// unblock
	for (let i = 0; i < friendCount; i++) {
		const blockedListComponent = await profileNavigate(driver, "blockedListLink", 
			"Baby cadet blocked list", "blockedListComponent")
		const blockedListShadowRoot = await driver
		.executeScript('return arguments[0].shadowRoot', blockedListComponent)
		await sleep(configs.timeWait)
		const trEl = await blockedListShadowRoot.findElements(By.css("tr"))
		const friendName = await trEl[0].getAttribute("id")
		const unBlockBtn = await trEl[0].findElement(By.id(`${friendName}UnBlockBtn`))
		await unBlockBtn.click()
		await sleep(configs.timeWait)
		await elementDisappear(blockedListShadowRoot, `${friendName}UnBlockBtn`)
		await friendsShadowRoot.findElement(By.id(friendName))
	}

	await logout(driver)
}

module.exports = testFriendBlocked