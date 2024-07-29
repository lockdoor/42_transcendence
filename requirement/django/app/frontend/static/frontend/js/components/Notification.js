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
					<button id="${user.username}FriendAccept" 
						data-userid="${user.user_id}" 
						data-avatar="${user.avatar}"
						data-username="${user.username}">
						<i class="uil uil-user-plus"></i> Accept
					</button>
				</td>
				<td>
				<button id="${user.username}FriendDecline" data-userid="${user.user_id}">
					<i class="uil uil-user-plus"></i> Decline
				</button>
			</td>
			</tr>
		`).join('');
	}

	friendDecline = async (e) => {
		const payload = {
			"owner_id": getUserId(),
			"user_id": e.target.dataset.userid
		}
		// console.log(payload)
		const result = await fetchJson("friendDecline", "DELETE", 
			`${window.location.origin}/api/users/notifications/delete`, payload)
		if (result) {
			console.log(result)
			this.fetchNotification()
		}
	}

	friendAccept = async (e) => {
		// const {userid, username, avatar} = e.target.dataset
		const payload = {
			"owner_id": getUserId(),
			"user_id": e.target.dataset.userid
		}
		const result = await fetchJson("friendAccept", "POST", 
		`${window.location.origin}/api/users/friends/accept`, payload)
		if (result) {
			// console.log(result)
			this.fetchNotification()
			
			//update friendsComponent
			const dashBoard = document.getElementById("dashBoardComponent").shadowRoot
			const friends = dashBoard.getElementById("friendsComponent")
			friends.fetchFriends()
			// console.log(userid, username, avatar)
			// friends.append(userid, username, avatar)
		}
		
	}

	render = (result) => {
		const tableBody = this.shadowRoot.getElementById("notificationTableBody")
		tableBody.innerHTML = ""
		tableBody.innerHTML = this.generateRows(result)
		for (const user of result) {
			this.shadowRoot.getElementById(`${user.username}FriendDecline`)
				.addEventListener("click", this.friendDecline)
			this.shadowRoot.getElementById(`${user.username}FriendAccept`)
				.addEventListener("click", this.friendAccept)
		}
	}

	fetchNotification = async() => {
		const result = await fetchJson("fetchNotification", "GET", `/api/users/${getUserId()}/notifications`)
		if (result) {
			// console.log(result)
			this.render(result)
		} else {
			this.shadowRoot.getElementById("notificationTableBody").innerHTML = ""
		}
	}

	connectedCallback(){
		this.fetchNotification()
	}
}