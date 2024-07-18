import { getUserId, addNavigate, fetchJson } from "./utils.js";

export class Friends extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.friends = []
		this.shadowRoot.innerHTML = this.template()
	}

	template = () => {
		return `
			<link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
			<link rel="stylesheet" href="${window.location.origin}/static/frontend/js/components/Friends.css">
			
			<div id="Friends">
				<div id="header">
					<h4>Friends</h4>
					<button id="friendRecommendBtn" data-url="recommend-friend" data-title="Baby cadet friend recommend">
						<i class="uil uil-user-plus"></i> Find Friends
					</button>
				</div>
				<table>
					<tbody id="friendTableBody">
					</tbody>
				</table>
			</div>
		`;
	};

	generateRows(friends) {
		return friends.map(
			(friend) => `
			<tr>
				<td>
					<div id="profile">
						<div id="profile-photo">
							<img src="${friend.avatar}" alt="Profile Photo" 
								onerror="this.onerror=null; this.src='/user-media/avatars/default.png';">
						</div>
						<div id="profile-name">
							<p><b>${friend.username}</b></p>
						</div>
					</div>
				</td>
				<td>
					<p class="${
						friend.is_online == true
							? "status-online"
							: "status-offline"
					}">
						${ friend.is_online == true ? 'Online' : 'Offline'}
					</p>
				</td>
				<td>
					<div id="icon">
						<i id="${`${friend.username}ProfileBtn`}" class="uil uil-user"></i>
						<i class="uil uil-comment-dots"></i>
						<i class="uil uil-upload"></i>
					</div>
				</td>
			</tr>
		`).join('');
	}

	fetchFriends = async () => {
		const result = await fetchJson("fetchFriends", "GET", `/api/users/${getUserId()}/friends`)
		console.log(result)
		if (result) this.render(result)
	};

	render(result) {
		this.shadowRoot.getElementById('friendTableBody').innerHTML = this.generateRows(result)
	}

	connectedCallback() {
		this.fetchFriends()

		// JavaScript to handle navigation and content loading
		document.addEventListener('DOMContentLoaded', () => {
			// console.log('DOMContentLoaded')
			const parent = this.parentNode.parentNode.parentNode
			const mainFrame = parent.getElementById("mainFrame")

			// Attach click event listener to navigation items
			const friendRecommendBtn = this.shadowRoot.querySelector('#friendRecommendBtn')
			addNavigate(friendRecommendBtn, mainFrame)
		})
	}
}
