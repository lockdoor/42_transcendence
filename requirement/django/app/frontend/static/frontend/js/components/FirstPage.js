export class FirstPage extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = this.template();
	}

	template = () => {
		return `
			<link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
			<link rel="stylesheet" href="./static/frontend/js/components/firstPage.css">
			
			<div id="nav">
				<div id="bg">
					<button id="signInBtn">SIGN IN</button>
					<p id="textJoin">to join the TOURNAMENT ! Or </p>
					<button id="signUpBtn">SIGN UP</button>
				</div>
			</div>
			
			<div id="gameTag">
				<p>Game</p>
			</div>
			
			<div id="footer">
				<p>
					@ 2024, Made with 
					<i class="uil uil-heart-alt"></i> 
					by 
					<span>42 Baby Cadet</span>
				</p>
			</div>

			<modal-login-component id="modalLoginComponent" style="display: none;"></modal-login-component>
			<modal-sign-up-component id="modalSignUpComponent" style="display: none;"></modal-sign-up-component>
		`;
	};

	toggleModal = (modalId) => {
		const noneDisplayAllModal = () => {
			this.shadowRoot.getElementById("modalLoginComponent").style.display = "none"
			this.shadowRoot.getElementById("modalSignUpComponent").style.display = "none"
		}

		const modal = this.shadowRoot.getElementById(modalId)

		if (modal.style.display == "block") {
			noneDisplayAllModal()
		} else {
			noneDisplayAllModal()
			modal.style.display = "block"
		}
	}

	connectedCallback() {

		this.shadowRoot.getElementById("signInBtn").addEventListener("click", () => {
			this.toggleModal("modalLoginComponent")
		})

		this.shadowRoot.getElementById("signUpBtn").addEventListener("click", () => {
			this.toggleModal("modalSignUpComponent")
		})
	}
}
