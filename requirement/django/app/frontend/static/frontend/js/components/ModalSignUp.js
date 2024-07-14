import { getCSRFToken } from "./utils.js"

export class ModalSignUp extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({mode: 'open'})
		this.shadowRoot.innerHTML = this.template()
	}

	template = () => {
		return `
		<link rel="stylesheet" href="./static/frontend/js/components/ModalSignUp.css">
		<div  id="container">
			<div>
				<form action="" id="signUpForm">
					<h3>Sign Up modal</h3>
					<h4 class="gray">Enter your username and password to sign up</h4>
					<div id="usernameCon">
						<label for="username">Username</label>
						<input class="input-css" type="text" 
							placeholder="Your username" id="usernameSignUp" 
							name="username" required>
					</div>
					<div id="passwordCon">
						<label for="password">Password</label>
						<input class="input-css" type="password" 
							placeholder="Your password" id="passwordSignUp" 
							name="password" required>
					</div>
					
					<div id="avatarCon">
					<label for="avatar">Avatar</label-->
					<input class="input-css" type="file" 
						placeholder="Your avatar" id="avatarSignUp" 
						name="avatar" accept="image/*">
					</div>

					<button type="submit" id="signUpBtn">SIGN UP</button>
				</form>
			</div>
		</div>
		`
	}

	signUp = async(e) => {
		e.preventDefault()

		try {
			const csrfToken = getCSRFToken();
			if (!csrfToken) {
			throw new Error("CSRF token not found");
			}

			const form = e.target
			const formData = new FormData(form);

			console.log(formData)

			const response = await fetch(`api/auth/register`, {
				method: 'POST',
				credentials: "same-origin",
				headers: {
					"X-CSRFToken": csrfToken
				},
				body: formData,
			});

			const result = await response.json();

			if (response.status == 201) {
				console.log(result)
				window.location.replace(window.location.origin + "/dashboard")
			} else {
				throw new Error(`${response.status} ${response.statusText} ${result.error}`);
			}
		} catch (error) {
			console.error('Error signUp:', error);
		}
	}

	connectedCallback(){

		// debug
		// this.shadowRoot.getElementById("usernameSignUp").value = "test1"
		// this.shadowRoot.getElementById("passwordSignUp").value = "testtest1"

		this.shadowRoot.getElementById("signUpForm")
			.addEventListener("submit", this.signUp)
	}
}