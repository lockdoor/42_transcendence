const { By } = require('selenium-webdriver');
const assert = require("assert");
const configs = require("./configs")
const {login, logout, testUser, friendRequest, friendRecommendNavigate, sleep} = require("./utils");

testFriendRequest = async (driver) => {
	await login(driver, configs.users[0])

	for (let i = 1; i < configs.users.length; i++) {
		const friendRecommendComponent = friendRecommendNavigate(driver)
		const shadowRoot = await driver.executeScript('return arguments[0].shadowRoot', friendRecommendComponent)
		const friendRequestBtn = await shadowRoot.findElement(By.id(`${configs.users[i].username}FriendRequest`))
		await friendRequestBtn.click()
		await sleep (1000)
		let buttonAbsent = false;
		try {
			// console.error(`findElement id=${configs.users[i].username}FriendRequest`)
			const btn = await shadowRoot.findElement(By.id(`${configs.users[i].username}FriendRequest`))
			// await btn.click()
		}
		catch (error) {
			// console.error("the name of error", error.name)
			if (error.name === 'StaleElementReferenceError' || error.name == "NoSuchElementError") {
				buttonAbsent = true;
			} else {
				throw error;
			}
			buttonAbsent = true;
		}
		assert.equal(buttonAbsent, true, 'The friend request button should be absent');
	}
	
	await logout(driver)
}

module.exports = testFriendRequest
