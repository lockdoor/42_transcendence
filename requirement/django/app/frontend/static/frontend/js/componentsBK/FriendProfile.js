export class FriendProfile extends HTMLElement {
	constructor() {
		console.log("FriendProfile");
		super();
		this.attachShadow({ mode: "open" });
	}

	template = () => {
		return `
			<link rel="stylesheet" href="https://unicons.iconscout.com/release/v3.0.6/css/line.css">
			<link rel="stylesheet" href="./static/frontend/js/components/FriendProfile.css">
			
			<div id="friendProfile">
				<div id="header">
					<h4>Friend Profile</h4>
				</div>
				<div id="content">
					<div id="photo">
						<img src="../images/profile-2.jpg" alt="Profile Photo">
					</div>
					<div id="detail">
						<div id="name">
							<b>Sarah<b>
						</div>
						<a class="menu-item">
							<span><i class="uil uil-globe"></i></span>
							<h3>RANK</h3>
							<p>11</p>
						</a>
						<a class="menu-item">
							<span><i class="uil uil-arrow-growth"></i></span>
							<h3>WIN</h3>
							<p>5</p>
						</a>
						<a class="menu-item">
							<span><i class="uil uil-chart-down"></i></span>
							<h3>LOSE</h3>
							<p>2</p>
						</a>
					</div>
				</div>
				<div id="button-block">
					<button id="block">
							<i class="uil uil-user-times"></i> Block
						</button>
				</div>
			</div>
		`;
	};

	connectedCallback() {
		this.shadowRoot.innerHTML = this.template();
	}

	disconnectedCallback() {
		console.log("delete Friend Profile components");
	}
}

