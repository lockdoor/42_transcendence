export class TournamentOngoing extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	template = () => {
		return `
			<link rel="stylesheet" href="./static/frontend/js/components/tournamentOngoing.css">
			<link rel="stylesheet" href="https://unicons.iconscout.com/release/v3.0.6/css/line.css">
			
			<div id="tour-ongoing">
				<span>
					<i class="uil uil-clock"></i>
				</span>
				<div id="content">
					<h4>TOURNAMENT is ongoing ...</h4>
					<small>registered member (4/4)</small>
				</div>
				<button class="btn" disabled>JOIN TOURNAMENT</button>
			</div>
		`;
	}

	connectedCallback() {
		this.shadowRoot.innerHTML = this.template();
	}
}
