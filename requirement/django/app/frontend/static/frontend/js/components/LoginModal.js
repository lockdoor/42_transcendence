import { navigateToForMainPage } from "../index.js";
export class LoginModal extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	template = () => {
		return `
			<link rel="stylesheet" href="./static/frontend/js/components/LoginModal.css">
			<div  id="container">
				<div>
					<form action="" id="signInForm">
						<h3>Welcome Back</h3>
						<h4 class="gray">Enter your username and password to sign in</h4>
						<div id="username-con">
							<label for="username">Username</label>
							<input class="input-css" type="text" placeholder="Your username" id="username" required>
						</div>
						<div id="password-con">
							<label for="password">Password</label>
							<input class="input-css" type="password" placeholder="Your password" id="password" required>
						</div>
						<button type="submit" id="loginButton">SIGN IN</button>
					</form>
				</div>
				<div>
					<h4>or</h4>
				</div>
				<div id="signIn-with">
					<h4 class="gray">Sign In with</h4>
					<button type="submit" id="btn-42">
						<img src="./static/frontend/images/42eco.png" alt="42 icon">
					</button>
				</div>
			</div>
		`;
	}

	connectedCallback(){
		this.shadowRoot.innerHTML = this.template();

		// console.log(this.shadowRoot.querySelector('#container').querySelector("#loginButton").addEventListener());
		this.shadowRoot.querySelector("#signInForm")
			.addEventListener('submit', async (e)=>{
				e.preventDefault()
				this.checkUserAlreadyLogin();
				
				console.log (e)
				const data = {
					username: this.shadowRoot.getElementById("username").value,
					password: this.shadowRoot.getElementById("password").value
				}

				// console.log(document.getElementsByName("csrfmiddlewaretoken")[0].value);
				
				await fetch( "api/auth/login",{
						method: "POST",
						credentials: "same-origin",
						headers:{
							"X-CSRFToken": document.getElementsByName("csrfmiddlewaretoken")[0].value,
							"Content-Type":"application/json"
						},
						body: JSON.stringify(data),
					}).then(res =>{
						console.log(res.json());
					}
				)
			// const result = this.postUserAndPassword()
			// navigateToForMainPage("/dashboard-page");
		})
		// this.shadowRoot.querySelector('#loginButton').addEventListener('click', () => {
		// 	navigateToForMainPage("/dashboard-page");
		// });
	}

	async checkUserAlreadyLogin(){
		console.log("Hello from login modal");
		await fetch("api/get_csrf_token_and_session_id/",{

		}).then(res => {
			console.log(res.json());
			// navigateToForMainPage("/dashboard-page");
		})
	}
	// async postUserAndPassword(){

	// }

}
