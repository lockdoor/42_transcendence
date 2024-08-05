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
						<div id="avatar" class="profile-photo">
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

	setupWebsocket = (result) => {
		this.socket = new WebSocket(
			`${window.location.origin}/ws/chatroom/private/${result.chatroom}`)

		// Listen for messages
		this.socket.addEventListener("message", (event) => {
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
			else if (obj.type == "message_handler") {
				try{
					const dashBoardComponent = document.getElementById("dashBoardComponent")
					const liveChat = dashBoardComponent.shadowRoot.getElementById("liveChatComponent")
					// console.log(obj)
					// console.log(liveChat.dataset.userid)
					if (liveChat.dataset.username == this.dataset.username)
						liveChat.updateChatRoom(obj)
					else {
						const avatar = this.shadowRoot.getElementById("avatar")
						avatar.classList.add('new-message')
						console.log("new message")
					}
				} catch(error) {
					if (error instanceof TypeError) {
						console.log("new message")
					} else {
						console.error("Unexpected error:", error)
					}
				}
				// console.log(obj.message)
			}
		});

		this.socket.addEventListener('close', () => {
			console.log(`friend ${this.dataset.username} has close websocket`)
		})
	}

	fetchChatRoom = async () => {
		const result = await fetchJson("fetchChatRoom", "GET", 
			`${window.location.origin}/chat/get/${this.dataset.username}`)
		
		if (result) {
			// console.log(result.chatroom)
			this.setupWebsocket(result)

			const dashBoardComponent = document.getElementById("dashBoardComponent")
			const dashBoardShadowRoot = dashBoardComponent.shadowRoot
			const liveChatComponent = dashBoardShadowRoot.getElementById("liveChatComponent")
			const chatBtn = this.shadowRoot.getElementById("chatBtn")
			chatBtn.addEventListener('click', ()=>{
				liveChatComponent.setAttribute("data-username", this.dataset.username)
				liveChatComponent.setAttribute("data-userid", this.dataset.id)
				liveChatComponent.setAttribute("data-avatar", this.dataset.avatar)
				liveChatComponent.setAttribute("data-chatroom", result.chatroom)

				// remove new-message
				const avatar = this.shadowRoot.getElementById("avatar")
				avatar.classList.remove('new-message')
			})
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

	disconnectedCallback() {
		// console.log(`friend ${this.dataset.username} has gone`)
		if (this.socket) {
			this.socket.close();
			this.socket = null; // Clean up reference
		}
	}
}