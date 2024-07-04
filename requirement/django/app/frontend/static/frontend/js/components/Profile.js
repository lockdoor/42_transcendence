import { isTag } from "./Utils.js";

export class Profile extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	template = () => {
		return `
			<link rel="stylesheet" href="https://unicons.iconscout.com/release/v3.0.6/css/line.css">
			<link rel="stylesheet" href="./static/frontend/js/components/profile.css">
			
			<div id="container">
				<div id="profile-photo-big">
					<img src="./images/profile-1.jpg" alt="Profile Photo">
				</div>
				<a id="profile-name">
					<h4>Prem</h4>
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
						<h3>Log Out</h3>
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

	connectedCallback() {
		this.shadowRoot.innerHTML = this.template();

		this.shadowRoot
			.querySelector("#match-history-menu")
			.addEventListener("click", () => {
				const notificationElement = document
					.querySelector("main-page")
					.shadowRoot.childNodes[0].shadowRoot.querySelector(
						"notifi-cation"
					).shadowRoot;
				addElementInNoti(notificationElement, "match-history");
			});

		this.shadowRoot
			.querySelector("#account")
			.addEventListener("click", () => {
				const notificationElement = document
					.querySelector("main-page")
					.shadowRoot.childNodes[0].shadowRoot.querySelector(
						"notifi-cation"
					).shadowRoot;
				addElementInNoti(notificationElement, "account-managment");
			});

		this.shadowRoot
			.querySelector("#friendsRequest")
			.addEventListener("click", () => {
				const notificationElement = document
					.querySelector("main-page")
					.shadowRoot.childNodes[0].shadowRoot.querySelector(
						"notifi-cation"
					).shadowRoot;
				addElementInNoti(notificationElement, "friends-request");
			});

		this.shadowRoot
			.querySelector("#statistic")
			.addEventListener("click", () => {
				const notificationElement = document
					.querySelector("main-page")
					.shadowRoot.childNodes[0].shadowRoot.querySelector(
						"notifi-cation"
					).shadowRoot;
				addElementInNoti(notificationElement, "statis-tic");
			});

		this.shadowRoot
			.querySelector("#blockedList")
			.addEventListener("click", () => {
				const notificationElement = document
					.querySelector("main-page")
					.shadowRoot.childNodes[0].shadowRoot.querySelector(
						"notifi-cation"
					).shadowRoot;
				addElementInNoti(notificationElement, "block-list");
			});
	}
}

function addElementInNoti(notiElement, nameElement) {
	const addElement = document.createElement(nameElement);
	if (notiElement.childNodes.length == 3) {
		const nodeRemove = notiElement.childNodes[2];
		notiElement.removeChild(nodeRemove);
	}
	if (!isTag(notiElement.lastChild, nameElement)) {
		notiElement.appendChild(addElement);
	}
}