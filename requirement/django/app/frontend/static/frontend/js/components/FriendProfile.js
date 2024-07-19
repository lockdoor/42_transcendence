import { fetchJson, getUserId } from "./utils.js";

export class FriendProfile extends HTMLElement {
	
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = this.template()
	}

	template = () => {
		return `
			<link rel="stylesheet" href="https://unicons.iconscout.com/release/v3.0.6/css/line.css">
			<link rel="stylesheet" href="${window.location.origin}/static/frontend/js/components/FriendProfile.css">
			
			<div id="friendProfile">
				<div id="header">
					<h4>Friend Profile</h4>
				</div>
				<div id="content">
					<div id="photo">
						
					</div>
					<div id="detail">
						<div id="username">
							Sarah
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
		this.fetchUserProfile(this.dataset.user)
	}

	render = (user) => {
		this.shadowRoot.getElementById("photo")
			.innerHTML = `<img src="${user.avatar}" alt="Profile Photo" 
		onerror="this.onerror=null; this.src='/user-media/avatars/default.png';">`
		this.shadowRoot.getElementById("username").innerText = user.username
	}

	fetchUserProfile = async (userId) => {
		const user = await fetchJson("fetchUserProfile", "GET", 
			`/api/users/${userId}/${getUserId()}/profile`)
		if (user) {
			this.render(user)
		}
	}
	
	disconnectedCallback() {
		console.log("delete Friend Profile components");
	}
}
