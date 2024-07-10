export class LiveChat extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	template = () => {
		return `
			<link rel="stylesheet" href="./static/frontend/js/components/liveChat.css">
			
			<div id="liveChat">
				<div id="header">
					<h4>Live Chat</h4>
				</div>
			</div>
		`;
	}

	connectedCallback() {
		this.shadowRoot.innerHTML = this.template();
	}
}
