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
							Unknow
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
					<button id="blockBtn">
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
		const blockBtn = this.shadowRoot.getElementById("blockBtn")
		blockBtn.setAttribute("data-userid", user.id)
		blockBtn.addEventListener("click", this.blockFriend)

	}

	blockFriend = async(e) => {
		// console.log(e.target)
		// console.log(e.target.dataset.userid)
		const payload = {
			owner_id: getUserId(),
			user_id: e.target.dataset.userid
		}
		const result = await fetchJson("blockFriend", "POST", "/api/users/block", payload)
		if (result){
			// console.log(result)
			// re render friendsComponent
			const dashBoardComponent = document.getElementById("dashBoardComponent")
			const friendsComponent = dashBoardComponent.shadowRoot.getElementById("friendsComponent")
			friendsComponent.fetchFriends()

			// navigate to blocked list
			const profileComponent = dashBoardComponent.shadowRoot.getElementById("profileComponent")
			const blockedListBtn = profileComponent.shadowRoot.getElementById("blockedListLink")
			blockedListBtn.click()
		}
	}

	fetchUserProfile = async (userId) => {
		const result = await fetchJson("fetchUserProfile", "GET", 
			`/api/users/${userId}/${getUserId()}/profile`)
		console.log(result)
		if (result) {
			this.render(result)
		}
	}
	
	disconnectedCallback() {
		console.log("delete Friend Profile components");
	}
}

