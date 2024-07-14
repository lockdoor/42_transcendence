// import { isTag } from "./Utils.js";
import { getCSRFToken, getUserId } from "./utils.js";

export class Profile extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = this.template();
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
					<div class="menu-item" data-url="account-management" data-title="Baby cadet">
						<span><i class="uil uil-user"></i></span>
						<h3>Account</h3>
					</div>
					<div class="menu-item" data-url="notification" data-title="Baby cadet">
						<span><i class="uil uil-bell"></i></span>
						<h3>Notifications</h3>
					</div>
					<a class="menu-item" data-url="statistic" data-title="Baby cadet">
						<span><i class="uil uil-chart-bar"></i></span>
						<h3>Statistic</h3>
					</a>
					<a class="menu-item" id="match-history-menu" data-url="match-history" data-title="Baby cadet">
						<span><i class="uil uil-file-alt"></i></span>
						<h3>Match History</h3>
					</a>
					<a class="menu-item" data-url="blocked-list" data-title="Baby cadet">
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
		this.fetchUser();
		
		this.shadowRoot.querySelector("#logOut").addEventListener("click", this.logOut)

		// JavaScript to handle navigation and content loading
        document.addEventListener('DOMContentLoaded', () => {
			// console.log('DOMContentLoaded')
            const parent = this.parentNode.parentNode
			const mainFrame = parent.getElementById("mainFrame")

            // Function to load content dynamically
            function loadContent(url) {
                // Fetch content from server or set it directly
                // For demo purposes, let's just set it directly
                const content = {
                    'account-management': "<account-management-component></account-management-component>",
                    'notification': '<notification-component></notification-component>',
					'statistic': "<statistic-component></statistic-component>",
					'match-history': "<match-history-component></match-history-component>",
					'blocked-list': "<blocked-list-component></blocked-list-component>"
                };
                mainFrame.innerHTML = content[url] || 'Content not found';
            }

            // Function to handle navigation
            function navigate(event) {
				console.log("navigate worked!")
				console.log(event)
                const url = event.getAttribute('data-url');
                const title = event.getAttribute('data-title');

                // Push state to history
                // history.pushState({url: url}, title, `/${url}`);
                history.pushState({url: url}, title);
                // document.title = title; // Change the document title

                // Load the content
                loadContent(url);
            }

            // Attach click event listener to navigation items
            this.shadowRoot.querySelectorAll('.menu-item').forEach(item => {
                item.addEventListener('click', () => navigate(item));
            });

            // Handle back/forward button
            window.addEventListener('popstate', (event) => {
                if (event.state) {
                    loadContent(event.state.url);
                }
            });
        });
	}
}
