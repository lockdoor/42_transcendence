import { getCSRFToken } from "./utils.js"

export class ModalSignUp extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({mode: 'open'})
		this.shadowRoot.innerHTML = this.template()
	}

	template = () => {
		return `
			<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
			<link rel="stylesheet" href="./static/frontend/js/components/ModalSignUp.css">

			<form id="signUpForm">
				<p id="textSignUp" class="text-center fw-bold">Sign Up</p>
				<p class="text-gray d-none d-sm-flex text-center fw-bold d-flex justify-content-center align-items-center">Enter your username and password to sign up</p>
				<div id="usernameCon" class="d-flex align-items-center justify-content-center">
					<label id="userLabel" for="username">Username</label>
					<input class="input-css" type="text" 
						placeholder="Your username" id="usernameSignUp" 
						name="username" required>
				</div>
				<div id="emailCon" class="d-flex align-items-center justify-content-center">
					<label id="passLabel" for="email">Email</label>
					<input class="input-css" type="email" 
						placeholder="your@host.domain" id="emailSignUp" 
						name="email" required>
				</div>
				<div class="d-flex align-items-center justify-content-center">
					<label for="avatar">Avatar</label>
					<input id="avatarSignUp" class="input-img"
						type="file"
						name="avatar" accept="image/*">
				</div>
				<div class="d-flex align-items-center justify-content-center mb-3">
					<div id="avatarCon" class="position-relative ">
						<img id="profileImg" src="./static/frontend/images/default.png" alt="profile default" class="position-absolute top-0 start-0 w-100 h-100">
					</div>
				</div>
				<button id="signUpBtn" class="btn container-fluid d-flex align-items-center justify-content-center" type="submit">SIGN UP</button>
			</form>
		`;
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

			const response = await fetch(`api/auth/pre-register`, {
				method: 'POST',
				credentials: "same-origin",
				headers: {
					"X-CSRFToken": csrfToken
				},
				body: formData,
			});

			const result = await response.json();

			if (response.status == 200) {
				console.log(result)
				window.location.replace(window.location.origin + "/api/check_email")
			}
			else {
				throw new Error(`${response.status} ${response.statusText} ${result.error}`);
			}
		} catch (error) {
			console.error('Error signUp:', error);
		}
	}

	connectedCallback(){
		this.shadowRoot.innerHTML = this.template();
		var profilePic = this.shadowRoot.getElementById("profileImg");
		var inputFile = this.shadowRoot.getElementById("avatarSignUp");
		inputFile.onchange = function(){
			profilePic.src = URL.createObjectURL(inputFile.files[0]);
		}

		this.shadowRoot.getElementById("signUpForm")
			.addEventListener("submit", this.signUp)
	}
}