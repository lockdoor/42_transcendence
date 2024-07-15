export class AccountManagment extends HTMLElement {
	constructor() {
		console.log("Account");
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = this.template();
	}

	template = () => {
		return `
			<link rel="stylesheet" href="${window.location.origin}/static/frontend/js/components/AccountManagment.css">
			
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

	}

	disconnectedCallback() {
		console.log("delete Account Managment components");
	}
}
