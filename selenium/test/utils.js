const {until, By} = require ('selenium-webdriver')

async function login(driver, user) {
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
}

async function logout(driver){
	const dashBoard = await driver.findElement(By.id('dashBoardComponent'))
	const dashBoardShadowRoot = await driver.executeScript('return arguments[0].shadowRoot', dashBoard)
	const profile = await dashBoardShadowRoot.findElement(By.id('profileComponent'))
	const profileShadowRoot = await driver.executeScript('return arguments[0].shadowRoot', profile)
	const logOutBtn = await profileShadowRoot.findElement(By.id('logOut'))
	await logOutBtn.click()
	await driver.wait(until.titleIs("Baby cadet first page"), 10000)
}

async function signup(driver, user) {
	const firstPage = await driver.findElement(By.id('firstPage'))
	const shadowRoot = await driver.executeScript('return arguments[0].shadowRoot', firstPage);
	
	const signUpBtn = await shadowRoot.findElement(By.id('signUpBtn'))
	await signUpBtn.click()
			
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
}

async function profileNavigate(driver, target, title, mainFrame) {
	const dashBoard = await driver.findElement(By.id('dashBoardComponent'))
	const dashBoardShadowRoot = await driver.executeScript('return arguments[0].shadowRoot', dashBoard)
	const profile = await dashBoardShadowRoot.findElement(By.id('profileComponent'))
	const profileShadowRoot = await driver.executeScript('return arguments[0].shadowRoot', profile)
	const targetEl = await profileShadowRoot.findElement(By.id(target))
	await targetEl.click()
	await driver.wait(until.titleIs(title), 10000)
	await dashBoardShadowRoot.findElement(By.id(mainFrame))
}

module.exports = {
	login,
	logout,
	signup,
	profileNavigate
}