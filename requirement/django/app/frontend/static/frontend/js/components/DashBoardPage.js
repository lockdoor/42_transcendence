import { getCSRFToken, getUserId } from "./utils.js"

export class DashBoardPage extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = this.template()
	}

	fetchUser = async() => {
		try {
			const csrfToken = getCSRFToken();
			if (!csrfToken) {
				throw new Error("CSRF token not found");
			}

			const owner_id = getUserId()
			if (!owner_id) {
				throw new Error("owner_id not found");
			}

			const response = await fetch(`${window.location.origin}/api/users/${owner_id}/${owner_id}/profile`, {
				method: 'GET',
				credentials: "same-origin",
				headers: {
					"X-CSRFToken": csrfToken,
					"Content-Type": "application/json"
				},
			});
  
			const result = await response.json()

			if (!response.ok) {
				throw new Error(`${response.status} ${response.statusText} ${result.error}`);
			}
			// console.log(result)

			this.render(result)

		} catch (error) {
			console.error(`Error fetching owner: ${error}`);
		}
	}

	template = () => {
		return `
			<link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
			<link rel="stylesheet" href="${window.location.origin}/static/frontend/js/components/DashBoardPage.css">
				
			<div id="navBar">
				<div id="container">
					<div id="menu">
						<i class="uil uil-bars"></i>
					</div>
					<div id="logo">
						<i class="uil uil-window-grid"></i>
						<h2>DASHBOARD</h2>
					</div>
					<div id="profile">
						<div id="profile-name">
							Unknow
						</div>
						<div id="profile-photo">
							<img src="${window.location.origin+"/user-media/avatars/default.png"}" 
								alt="Profile Photo" id="profileImg"
								onerror="this.onerror=null; this.src='${window.location.origin+"/user-media/avatars/default.png"}';">
						</div>
					</div>
				</div>
			</div>

			<div id="div-content">
				<profile-component id="profileComponent"></profile-component>
				<div id="div-middle">
					<tournament-component></tournament-component>
					<div id="mainFrame">
						<!--notification-component></notification-component-->
					</div>

				</div>
				<div id="div-right">
					<friends-component></friends-component>
					<live-chat-component></live-chat-component>
				</div>
			</div>

			<div id="footer">
				<p>
					@ 2024, Made with 
					<i class="uil uil-heart-alt"></i> 
					by 
					<span>42 Baby Cadet</span>
				</p>
			</div>
		`;
	}

	render = (user) => {
		const {username, avatar} = user
		this.shadowRoot.getElementById("profile-name").innerText = username
		this.shadowRoot.getElementById("profileImg").src = avatar
	} 

	toggleProfileVisibility = () => {
		const profile = this.shadowRoot.getElementById('profileComponent');
		if (profile) {
			profile.style.display = profile.style.display === 'none' ? 'block' : 'none';
		}
	}

	connectedCallback() {
		this.fetchUser()
		const menuIcon = this.shadowRoot.getElementById('menu');
		if (menuIcon) {
			menuIcon.addEventListener('click', this.toggleProfileVisibility);
		}
	}
}