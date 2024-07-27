const { By } = require('selenium-webdriver');
// const assert = require("assert");
const configs = require("./configs")
const {login, logout, friendRecommendNavigate, friendRequest, elementDisappear} = require("./utils");

testFriendRequest = async (driver) => {
	await login(driver, configs.users[0])
	for (let i = 1; i < configs.users.length; i++) {
		await friendRequest(driver, configs.users[i])
	}
	await logout(driver)

	await login(driver, configs.users[1])

	const friendRecommendComponent = friendRecommendNavigate(driver)
	const shadowRoot = await driver
		.executeScript('return arguments[0].shadowRoot', friendRecommendComponent)
	await elementDisappear(shadowRoot, `${configs.users[0].username}FriendRequest`)
	for (let i = 2; i < configs.users.length; i++) {
		await friendRequest(driver, configs.users[i])
	}
	await logout(driver)
}

module.exports = testFriendRequest
