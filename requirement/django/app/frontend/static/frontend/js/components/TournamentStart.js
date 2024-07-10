import { changeTournament } from "./Utils.js";

export class TournamentStart extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	template = () => {
		return `
			<link rel="stylesheet" href="./static/frontend/js/components/tournamentStart.css">
			<div id="tournament-start">
				<div id="header">
					<h4>Tournament</h4>
				</div>
				<div id="topic">
					<p>Start the tournament !</p>
				</div>
				<div id="content">
					<div id="input-name">
						<input type="text" placeholder="Fill your player name.">
					</div>
					<button>Start</button>
				</div>
			</div>
				
		`;
	};

	connectedCallback() {
		this.shadowRoot.innerHTML = this.template();

		// Add event listener to button after template is rendered
		const button = this.shadowRoot.querySelector("button");
		if (button) {
			button.addEventListener("click", () => {
				changeTournament("tournament-ongoing");
			});
		}
	}
}
