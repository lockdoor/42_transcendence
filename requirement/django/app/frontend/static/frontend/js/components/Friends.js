const Mock_list = [
	{
		name: 'Sarah',
		profileImg: '../images/profile-2.jpg',
		status: 'Online'
	},
	{
		name: 'Jenny',
		profileImg: '../images/profile-2.jpg',
		status: 'Offline'
	},
	{
		name: 'Lin',
		profileImg: '../images/profile-2.jpg',
		status: 'Offline'
	},
	{
		name: 'Kim',
		profileImg: '../images/profile-2.jpg',
		status: 'Online'
	}
];

import { changeNotification } from "./Utils.js";

export class Friends extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	template = () => {
		return `
			<link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
			<link rel="stylesheet" href="./static/frontend/js/components/friends.css">
			
			<div id="friends">
				<div id="header">
					<h4>Friends</h4>
					<button id="findFriendsButton">
						<i class="uil uil-user-plus"></i> Find Friends
					</button>
				</div>
				<table>
					<tbody>
						${this.generateRows()}
					</tbody>
				</table>
			</div>
		`;
	};

	generateRows() {
		return Mock_list.map(list => `
			<tr>
				<td>
					<div id="profile">
						<div id="profile-photo">
							<img src="${list.profileImg}" alt="Profile Photo">
						</div>
						<div id="profile-name">
							<p><b>${list.name}</b></p>
						</div>
					</div>
				</td>
				<td>
					<p class="${list.status === 'Online' ? 'status-online' : list.status === 'Offline' ? 'status-offline' : 'status-offline'}">
						${list.status}
					</p>
				</td>
				<td>
					<div id="icon">
						<i class="uil uil-user"></i>
						<i class="uil uil-comment-dots"></i>
						<i class="uil uil-upload"></i>
					</div>
				</td>
			</tr>
		`).join('');
	}

	connectedCallback() {
		this.shadowRoot.innerHTML = this.template();

		this.shadowRoot.querySelector('#findFriendsButton').addEventListener('click', () => {
			changeNotification("recommends-friends");
		});

		this.shadowRoot.querySelectorAll('.uil-user').forEach(icon => {
			icon.addEventListener('click', () => {
				changeNotification("friend-profile");
			});
		});

		this.shadowRoot.querySelectorAll('.uil-upload').forEach(icon => {
			icon.addEventListener('click', () => {
				changeNotification("invite-friend");
			});
		});
	}

}
