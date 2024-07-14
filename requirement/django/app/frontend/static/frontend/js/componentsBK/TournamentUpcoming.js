import { changeNotification } from "./Utils.js";

export class TournamentUpcoming extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	template = () => {
	return `
			<link rel="stylesheet" href="./static/frontend/js/components/tournamentUpcoming.css">
			<link rel="stylesheet" href="https://unicons.iconscout.com/release/v3.0.6/css/line.css">
			
			<div id="tour-upcomimg">
				<span>
					<i class="uil uil-check-circle"></i>
				</span>
				<div id="content">
					<h4>TOURNAMENT is upcoming ...</h4>
					<small>registered member (1/4)</small>
				</div>
				<button class="btn">JOIN TOURNAMENT</button>
			</div>
		`;
	}

	connectedCallback() {
		this.shadowRoot.innerHTML = this.template();
		
		// Add event listener to button after template is rendered
		const button = this.shadowRoot.querySelector('.btn');
		if (button) {
			button.addEventListener("click", () => {
				changeNotification("tournament-start");
			});
		}
	}
}
