// import { isTag } from "./Utils.js";
import { getCSRFToken, getUserId } from "./utils.js";

export class Profile extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		// this.userData = {};
		// this.fetchUser();
	}

	template = () => {
		return `
			<link rel="stylesheet" href="https://unicons.iconscout.com/release/v3.0.6/css/line.css">
			<link rel="stylesheet" href="${window.location.origin}/static/frontend/js/components/profile.css">
			
			<div id="container">
					<div id="profile-photo-big">
						<img id="avatar" src="${window.location.origin+"/user-media/avatars/default.png"}" alt="Profile Photo"
						onerror="this.onerror=null; this.src='${window.location.origin+"/user-media/avatars/default.png"}';">
					</div>
				<a id="profile-name">
					<h4 id="username">Unknow</h4>
				</a>
				<div id="side-bar">
					<a class="menu-item">
						<span><i class="uil uil-user"></i></span>
						<h3 id="account">Account</h3>
					</a>
					<a class="menu-item">
						<span><i class="uil uil-bell"></i></span>
						<h3 id="friendsRequest">Notifications</h3>
					</a>
					<a class="menu-item">
						<span><i class="uil uil-chart-bar"></i></span>
						<h3 id="statistic">Statistic</h3>
					</a>
					<a class="menu-item" id="match-history-menu">
						<span><i class="uil uil-file-alt"></i></span>
						<h3>Match History</h3>
					</a>
					<a class="menu-item">
						<span><i class="uil uil-envelope-block"></i></span>
						<h3 id="blockedList">Blocked List</h3>
					</a>
					<a class="menu-item">
						<span><i class="uil uil-signout"></i></span>
						<h3 id="logOut">Log Out</h3>
					</a>
				</div>
				<div id="offline-pong">
					<span><i class="uil uil-question-circle"></i></span>
					<div id="content">
						<h3>Need Practice?</h3>
						<small>Play OFFLINE with friend!</small>
					</div>
					<button class="btn">Play OFFLINE</button>
				</div>
			</div>
		`;
	};

	render = (user) => {
		const {username, avatar} = user
		this.shadowRoot.getElementById("username").innerText = username
		this.shadowRoot.getElementById("avatar").src = window.location.origin + "/" +avatar
	}

	fetchUser = async() => {
		try {
			const csrfToken = getCSRFToken();
			if (!csrfToken) {
				throw new Error("CSRF token not found");
			}

			const owner_id = getUserId()
			if (!owner_id) {
				throw new Error("userId not found");
			}

			const response = await fetch(`${window.location.origin}/api/users/${owner_id}/${owner_id}/profile`, {
				method: 'GET',
				credentials: "same-origin",
				headers: {
					"X-CSRFToken": csrfToken,
					"Content-Type": "application/json"
				},
			});
  
			if (!response.ok) {
				throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
			}

			const user = await response.json()
			this.render(user)
		} catch (error) {
			console.error('Error fetchUser:', error);
		}
	}

	logOut = async() => {
		try {
			console.log("logOut Clicked")
			const csrfToken = getCSRFToken();
			if (!csrfToken) {
				throw new Error("CSRF token not found");
			}

			const response = await fetch(`${window.location.origin}/api/auth/logout`, {
				method: 'POST',
				credentials: "same-origin",
				headers: {
					"X-CSRFToken": csrfToken,
					"Content-Type": "application/json"
				},
			});
	
			if (!response.ok) {
				throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
			}
			
			// const json = await response.json()
			// console.log(json)
			// localStorage.clear();
			window.location.replace(window.location.origin)
		} catch (error) {
			console.error('Error profile logout:', error);
		}
	}

	connectedCallback() {

		// console.log("profile was connected")
		this.shadowRoot.innerHTML = this.template();
		this.fetchUser();

		// this.shadowRoot
		// 	.querySelector("#match-history-menu")
		// 	.addEventListener("click", () => {
		// 		const notificationElement = document
		// 			.querySelector("main-page")
		// 			.shadowRoot.childNodes[0].shadowRoot.querySelector(
		// 				"notifi-cation"
		// 			).shadowRoot;
		// 		addElementInNoti(notificationElement, "match-history");
		// 	});

		// this.shadowRoot
		// 	.querySelector("#account")
		// 	.addEventListener("click", () => {
		// 		const notificationElement = document
		// 			.querySelector("main-page")
		// 			.shadowRoot.childNodes[0].shadowRoot.querySelector(
		// 				"notifi-cation"
		// 			).shadowRoot;
		// 		addElementInNoti(notificationElement, "account-managment");
		// 	});

		// this.shadowRoot
		// 	.querySelector("#friendsRequest")
		// 	.addEventListener("click", () => {
		// 		const notificationElement = document
		// 			.querySelector("main-page")
		// 			.shadowRoot.childNodes[0].shadowRoot.querySelector(
		// 				"notifi-cation"
		// 			).shadowRoot;
		// 		addElementInNoti(notificationElement, "friends-request");
		// 	});

		// this.shadowRoot
		// 	.querySelector("#statistic")
		// 	.addEventListener("click", () => {
		// 		const notificationElement = document
		// 			.querySelector("main-page")
		// 			.shadowRoot.childNodes[0].shadowRoot.querySelector(
		// 				"notifi-cation"
		// 			).shadowRoot;
		// 		addElementInNoti(notificationElement, "statis-tic");
		// 	});

		// this.shadowRoot
		// 	.querySelector("#blockedList")
		// 	.addEventListener("click", () => {
		// 		const notificationElement = document
		// 			.querySelector("main-page")
		// 			.shadowRoot.childNodes[0].shadowRoot.querySelector(
		// 				"notifi-cation"
		// 			).shadowRoot;
		// 		addElementInNoti(notificationElement, "block-list");
		// 	});

		this.shadowRoot.querySelector("#logOut").addEventListener("click", this.logOut)
	}
}

// function addElementInNoti(notiElement, nameElement) {
// 	const addElement = document.createElement(nameElement);
// 	if (notiElement.childNodes.length == 3) {
// 		const nodeRemove = notiElement.childNodes[2];
// 		notiElement.removeChild(nodeRemove);
// 	}
// 	if (!isTag(notiElement.lastChild, nameElement)) {
// 		notiElement.appendChild(addElement);
// 	}
// }