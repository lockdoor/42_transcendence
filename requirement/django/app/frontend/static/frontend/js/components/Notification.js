import { fetchJson, getUserId } from "./utils.js";

export class Notification extends HTMLElement{
	constructor(){
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = this.template();
	}

	template = () => {
		return `
			<link rel="stylesheet" href="${window.location.origin}/static/frontend/js/components/Notification.css" >
			<div>
				<div>notification</div>
				<table>
					<tboby id="notificationTableBody"></tbody>
				<table>
			</div>
		`
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
					<button id="${user.username}FriendAccept" data-user="${user.user_id}">
						<i class="uil uil-user-plus"></i> Accept
					</button>
				</td>
				<td>
				<button id="${user.username}FriendDecline" data-user="${user.user_id}">
					<i class="uil uil-user-plus"></i> Decline
				</button>
			</td>
			</tr>
		`).join('');
	}

	friendDecline = async (e) => {
		const payload = {
			"owner_id": getUserId(),
			"user_id": e.target.dataset.user
		}
		console.log(payload)
		const result = await fetchJson("friendDecline", "DELETE", 
			"/api/users/notifications/delete", payload)
		if (result) {
			console.log(result)
			this.fetchNotification()
		}
	}

	render = (result) => {
		const tableBody = this.shadowRoot.getElementById("notificationTableBody")
		tableBody.innerHTML = ""
		tableBody.innerHTML = this.generateRows(result)
		for (const user of result) {
			this.shadowRoot.getElementById(`${user.username}FriendDecline`)
				.addEventListener("click", this.friendDecline)
		}
	}

	fetchNotification = async() => {
		const result = await fetchJson("fetchNotification", "GET", `/api/users/${getUserId()}/notifications`)
		if (result) {
			console.log(result)
			this.render(result)
		} else {
			this.shadowRoot.getElementById("notificationTableBody").innerHTML = ""
		}
	}

	connectedCallback(){
		this.fetchNotification()
	}
}