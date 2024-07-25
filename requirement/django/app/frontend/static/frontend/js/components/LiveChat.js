// want props {username}
// to find chatroom name in database
// can send with username as attribute

export class LiveChat extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = this.template();
	}

	template = () => {
		return `
			<link rel="stylesheet" href="${window.location.origin}/static/frontend/js/components/liveChat.css">
			
			<div id="liveChat">
				<div id="header">
					<h4>Live Chat</h4>
				</div>
			</div>
		`;
	}

	connectedCallback() {
	}
}
