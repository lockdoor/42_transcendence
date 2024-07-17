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
					<button id="${user.username}FriendRequest" data-user="${user.id}">
						<i class="uil uil-user-plus"></i> Accept
					</button>
				</td>
				<td>
				<button id="${user.username}FriendRequest" data-user="${user.id}">
					<i class="uil uil-user-plus"></i> Decline
				</button>
			</td>
			</tr>
		`).join('');
	}

	render = (result) => {
		this.shadowRoot.getElementById("notificationTableBody")
			.innerHTML = this.generateRows(result)
	}

	fetchNotification = async() => {
		const result = await fetchJson("fetchNotification", "GET", `/api/users/${getUserId()}/notifications`)
		if (result) {
			console.log(result)
			this.render(result)
		}
	}

	connectedCallback(){
		this.fetchNotification()
	}
}