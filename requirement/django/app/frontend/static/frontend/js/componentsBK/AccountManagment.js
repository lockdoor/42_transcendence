export class AccountManagment extends HTMLElement {
	constructor() {
		console.log("Account");
		super();
		this.attachShadow({ mode: "open" });
	}

	template = () => {
		return `
			<link rel="stylesheet" href="./static/frontend/js/components/AccountManagment.css">
			
			<div id="accountManagment">
				<div id="header">
					<h4>Account Managment</h4>
				</div>
				<div id="topic">
					<p><b>Profile</b></p>
				</div>
				<div id="content">
					<div id="photo">
						<img src="../images/profile-1.jpg" alt="Profile Photo">
					</div>
					<button id="loginButton">Upload Image</button>
				</div>
			</div>
		`;
	};

	connectedCallback() {
		this.shadowRoot.innerHTML = this.template();
	}

	disconnectedCallback() {
		console.log("delete Account Managment components");
	}
}

