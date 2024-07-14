export class Tournament extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	template = () => {
		return `
			<link rel="stylesheet" href="${window.location.origin}/static/frontend/js/components/Tournament.css">
			<div><tournament-upcomming-component></tournament-upcomming-component></div>
		`;
	};

	connectedCallback() {
		console.log("tournament was connected")
		this.shadowRoot.innerHTML = this.template();
	}
}
