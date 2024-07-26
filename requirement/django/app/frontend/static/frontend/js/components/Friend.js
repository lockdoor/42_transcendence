import { addNavigate, fetchJson, getMainFrame } from "./utils.js"

export class Friend extends HTMLElement {
	// socket = {}
	constructor() {
		super()
		this.attachShadow({mode: 'open'})
		this.shadowRoot.innerHTML = this.template()
		// this.is_online = false
		// this.socket = new WebSocket()
	}

	template = () => {
		return `
			<link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
			<link rel="stylesheet" href="${window.location.origin}/static/frontend/js/components/Friend.css">
			
				<td>
					<div class="profile">
						<div class="profile-photo">
							<img src="${this.dataset.avatar}" alt="Profile Photo" 
							onerror="this.onerror=null; this.src='/user-media/avatars/default.png';">
						</div>
						<div class="profile-name">
							${this.dataset.username}
						</div>
					</div>
				</td>
				<td>
					<p id="status" class='status-offline'>
						Offline
					</p>
				</td>
				<td>
					<div>
						<i id="profileBtn" class="uil uil-user"
							data-url="friend-profile" data-title="baby cadet ${this.dataset.username}"
							data-user="${this.dataset.id}"></i>
						<i id="chatBtn" class="uil uil-comment-dots"></i>
						<i class="uil uil-upload"></i>
					</div>
				</td>
		`
	}

	fetchChatRoom = async () => {
		const result = await fetchJson("fetchChatRoom", "GET", 
			`${window.location.origin}/chat/${this.dataset.username}`)
		if (result) {
			console.log(result.chatroom)
			this.socket = new WebSocket(
				`${window.location.origin}/ws/chatroom/${result.chatroom}`)

			// Listen for messages
			this.socket.addEventListener("message", (event) => {
				// console.log("Message from server: ", event.data);
				const obj = JSON.parse(event.data)
				if (obj.type == "online_count_handler") {
					const status = this.shadowRoot.getElementById("status")
					if (obj.online_count > 0) {
						status.innerText = 'Online'
						status.classList = 'status-online'
					} else {
						status.innerText = 'Offline'
						status.classList = 'status-offline'
					}
				}
			});
			// this.socket.onmessage = (event) => {
			// 	const data = JSON.parse(event.data);
			// 	console.log(event.data);
			// };
		}
	}

	connectedCallback() {
		// Attach click event listener to navigation items
		const friendProfileBtn = this.shadowRoot.getElementById("profileBtn")
		addNavigate(friendProfileBtn, getMainFrame())

		this.fetchChatRoom()
		/* websocket
		* get room name for URI to create websocket 
		* use fetch to get <room_name>
		* this.socket = new WebSocket("ws://localhost:8000/<room_name>")
		*/



	}
}