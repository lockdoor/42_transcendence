import { getUserId, fetchJson } from "./utils.js";
export class RecommendFriends extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = this.template()
	}

	template = () => {
		return `
			<link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
			<link rel="stylesheet" href="${window.location.origin}/static/frontend/js/components/RecommendFriends.css">
			
			<div id="recommend-friend">
				<div id="header">
					<h4>Recommend Friends</h4>
				</div>
				<table>
					<tbody id="recommendFriendsTableBody">
					</tbody>
				</table>
			</div>
		`;
	}

	generateRows(users) {
		return users.map(user => `
			<tr>
				<td>
					<div id="profile">
						<div id="profile-photo">
							<img src="${user.avatar}" alt="Profile Photo" 
							onerror="this.onerror=null; this.src='/user-media/avatars/default.png';">
						</div>
						<div id="profile-name">
							<p id="profileName">${user.username}</p>
						</div>
					</div>
				</td>
				<td>
					<button id="${user.username}FriendRequest" data-user="${user.id}">
						<i class="uil uil-user-plus"></i> Send Request
					</button>
				</td>
			</tr>
		`).join('');
	}

	fetchRecommendFriends = async () => {
		const result = await fetchJson("fetchRecommendFriends", 
			"GET", `/api/users/${getUserId()}/friends/find_new`)
		if (result) this.render(result)
	};

	sendFriendRequest = async (e) => {
		const payload = {
			"owner_id": getUserId(),
			"user_id": e.target.dataset.user
		}
		console.log(payload)
		const result = await fetchJson("sendFriendRequest", "POST",
			"/api/users/notifications/friend_request", payload)
		if (result) {
			console.log(result)
			this.fetchRecommendFriends();
		} 
	}

	render = (users) => {
		const tableBody = this.shadowRoot.getElementById("recommendFriendsTableBody")
		tableBody.innerHTML = ""
		tableBody.innerHTML = this.generateRows(users)
		for (const user of users) {
			this.shadowRoot.getElementById(`${user.username}FriendRequest`)
				.addEventListener("click", this.sendFriendRequest)
		}
	}

	connectedCallback() {
		this.fetchRecommendFriends();
	}

	disconnectedCallback() {
		console.log("delete recommend friend components");
	}
}
