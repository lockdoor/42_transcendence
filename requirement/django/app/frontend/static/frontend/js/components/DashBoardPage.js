import { getUserAvatar, getUserName } from "./utils.js"

export class DashBoardPage extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = this.template()
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
							${getUserName()}
						</div>
						<div id="profile-photo">
							<img src="${window.location.origin + getUserAvatar()}" 
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
					<friends-component id="friendsComponent"></friends-component>
					<live-chat-component id="liveChatComponent"></live-chat-component>
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

	toggleProfileVisibility = () => {
		const profile = this.shadowRoot.getElementById('profileComponent');
		if (profile) {
			profile.style.display = profile.style.display === 'none' ? 'block' : 'none';
		}
	}

	connectedCallback() {
		const menuIcon = this.shadowRoot.getElementById('menu');
		if (menuIcon) {
			menuIcon.addEventListener('click', this.toggleProfileVisibility);
		}
	}
}