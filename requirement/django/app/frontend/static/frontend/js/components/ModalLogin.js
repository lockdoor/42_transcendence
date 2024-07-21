import { fetchJson, getCSRFToken } from "./utils.js";

export class ModalLogin extends HTMLElement {

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = this.template()
	}

	template = () => {
		return `
			<link rel="stylesheet" href="./static/frontend/js/components/ModalLogin.css">
			<div  id="container">
				<div>
					<form action="" id="signInForm">
						<h3>Welcome Back</h3>
						<h4 class="gray">Enter your username and password to sign in</h4>
						<div id="usernameCon">
							<label for="username">Username</label>
							<input class="input-css" type="text" 
								placeholder="Your username" id="username" 
								autocomplete="username"
								name="username" required>
						</div>
						<div id="passwordCon">
							<label for="password">Password</label>
							<input class="input-css" type="password" 
								placeholder="Your password" id="password" 
								autocomplete="current-password"
								name="password" required>
						</div>
						<button type="submit" id="loginButton">SIGN IN</button>
					</form>
				</div>
				<div>
					<h4>or</h4>
				</div>
				<div id="signInWith">
					<h4 class="gray">Sign In with</h4>
					<a href="${window.location.origin}/api/auth/login42"><button id="btn42">
						<img src="./static/frontend/images/42eco.png" alt="42 icon">
					</button></a>
				</div>
			</div>
		`;
	}

	login = async(e)=>{
		e.preventDefault()
		const data = {
			username: this.shadowRoot.querySelector("#username").value,
			password: this.shadowRoot.querySelector("#password").value
		}
		const result = await fetchJson("login", "POST", "api/auth/login", data)
		if (result) window.location.replace(window.location.origin + "/dashboard")
	}

	connectedCallback(){
		this.shadowRoot.getElementById("signInForm").addEventListener('submit', this.login)
	}

	disconnectedCallback(){
		console.log("ModalLogin was gone")
	}
}
