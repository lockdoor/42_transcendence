import { addNavigate, getMainFrame } from "./utils.js"

export class Friend extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({mode: 'open'})
		this.shadowRoot.innerHTML = this.template()
	}

	template = () => {
		return `
			<link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
			<link rel="stylesheet" href="${window.location.origin}/static/frontend/js/components/Friend.css">
			
				<td>
					<div class="profile">
						<div class="profile-photo">
							<img src="${this.dataset.avatar}" alt="Profile Photo" 
							onerror="this.onerror=null; this.src='/user-media/avatars/default.png';">
						</div>
						<div class="profile-name">
							${this.dataset.username}
						</div>
					</div>
				</td>
				<td>
					<p class="status-online">
						Online
					</p>
				</td>
				<td>
					<div>
						<i id="profileBtn" class="uil uil-user"
							data-url="friend-profile" data-title="baby cadet ${this.dataset.username}"
							data-user="${this.dataset.id}"></i>
						<i class="uil uil-comment-dots"></i>
						<i class="uil uil-upload"></i>
					</div>
				</td>
		`
	}

	connectedCallback() {

		// Attach click event listener to navigation items
		const friendProfileBtn = this.shadowRoot.getElementById("profileBtn")
		addNavigate(friendProfileBtn, getMainFrame())
	}
}