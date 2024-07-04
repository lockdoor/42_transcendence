export class DashBoardPage extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	template = () => {
		return `
			<link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
			<link rel="stylesheet" href="./static/frontend/js/components/DashBoardPage.css">
				
			<div id="nav-bar">
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
							<p><b>Prem</b></p>
						</div>
						<div id="profile-photo">
							<img src="../images/profile-1.jpg" alt="Profile Photo">
						</div>
					</div>
				</div>
			</div>

			<div id="div-content">
				<pro-file id="pro-file"></pro-file>
				<div id="div-middle">
					<tour-na-ment></tour-na-ment>
					<notifi-cation></notifi-cation>
				</div>
				<div id="div-right">
					<friends-block></friends-block>
					<live-chat></live-chat>
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
		const profile = this.shadowRoot.getElementById('pro-file');
		if (profile) {
			profile.style.display = profile.style.display === 'none' ? 'block' : 'none';
		}
	}

	connectedCallback() {
		this.shadowRoot.innerHTML = this.template();
		const menuIcon = this.shadowRoot.getElementById('menu');
		if (menuIcon) {
			menuIcon.addEventListener('click', this.toggleProfileVisibility);
		}
	}
}