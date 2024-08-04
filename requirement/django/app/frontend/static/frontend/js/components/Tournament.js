export class Tournament extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = this.template();
	}

	template = () => {
		return `
			<link rel="stylesheet" href="${window.location.origin}/static/frontend/js/components/Tournament.css">
			<tournament-upcomming-component></tournament-upcomming-component>
		`;
	};

	connectedCallback() {
		console.log("tournament was connected")
	}
}
