export class RegisterModal extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	template = () => {
		return `
			<link rel="stylesheet" href="./static/frontend/js/components/RegisterModal.css">
			<form action="" id="signUpForm">
				<h3>Sign Up</h3>
				<div id="photo">
					<img src="./static/frontend/js/images/profile-default.png" alt="profile default" id="profile-pic">
				</div>
				<div id="upload">
					<label for="input-file">Upload Image</label>
					<input type="file" accept="image/jpeg, image/jpg, image/png" id="input-file">
				</div>
				<div id="Form">
					<div id="username-con">
						<label for="username">Username</label>
						<input class="input-css" type="text" placeholder="username" id="username">
					</div>
					<div id="password-con">
						<label for="password">Password</label>
						<input class="input-css" type="password" placeholder="password" id="password">
					</div>
					<button type="submit">SIGN UP</button>
				</div>
			</form>
		`;
	}

	connectedCallback() {
		this.shadowRoot.innerHTML = this.template();

		var profilePic = this.shadowRoot.getElementById("profile-pic");
		var inputFile = this.shadowRoot.getElementById("input-file");

		inputFile.onchange = function(){
			profilePic.src = URL.createObjectURL(inputFile.files[0]);
		}
	}
}
