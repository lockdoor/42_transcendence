import { fetchJson, getUserId } from "./utils.js";

export class BlockedList extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = this.template();
	}

	template = () => {
		return `
			<link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
			<link rel="stylesheet" href="${window.location.origin}/static/frontend/js/components/BlockedList.css">
			
			<div id="blocked-list">
				<div id="header">
					<h4>Blocked List</h4>
				</div>
				<table>
					<tbody id="blockedListTableBody">
					</tbody>
				</table>
			</div>
		`;
	};

	generateRows(users) {
		return users.map(user => `
			<tr id="${user.username}">
				<td>
					<div id="profile">
						<div id="profile-photo">
						<img src="${user.avatar}" alt="Profile Photo" 
							onerror="this.onerror=null; this.src='/user-media/avatars/default.png';">
						</div>
						<div id="profile-name">
							${user.username}
						</div>
					</div>
				</td>
				<td>
					<button id="${user.username}UnBlockBtn" data-userid="${user.id}">
						<i class="uil uil-user-check"></i> Unblock
					</button>
				</td>
			</tr>
		`).join('');
	}

	render = (users) => {
		const blockedListTableBody = this.shadowRoot.getElementById("blockedListTableBody")
		blockedListTableBody.innerHTML = this.generateRows(users)
		// const trEl = this.shadowRoot.querySelectorAll("tr")
		// console.log(trEl)
		users.forEach(user => {
			const unBlockBtn = this.shadowRoot.getElementById(`${user.username}UnBlockBtn`)
			// console.log(unBlockBtn)
			unBlockBtn.addEventListener("click", this.unBlockFriend)
		})
	}

	unBlockFriend = async(e) => {
		const payload = {
			owner_id: getUserId(),
			user_id: e.target.dataset.userid
		}
		const result = await fetchJson("unBlockFriend", "POST", "/api/users/unblock", payload)
		console.log(result)
		if (result) {
			this.fetchFriendBlocked()

			// re render friendsComponent
			const dashBoardComponent = document.getElementById("dashBoardComponent")
			const friendsComponent = dashBoardComponent.shadowRoot.getElementById("friendsComponent")
			friendsComponent.fetchFriends()
		}
	}

	fetchFriendBlocked = async () => {
		const result = await fetchJson("fetchFriendBlocked", "GET",
			`/api/users/${getUserId()}/blocked_list`)
		if(result){
			this.render(result)
		} else {
			this.shadowRoot.getElementById("blockedListTableBody").innerHTML = ""
		}
	}

	connectedCallback() {
		this.fetchFriendBlocked()
	}

	disconnectedCallback() {
		console.log("delete blocked list components");
	}
}