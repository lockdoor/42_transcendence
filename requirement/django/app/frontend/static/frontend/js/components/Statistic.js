export class Statistic extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	template = () => {
		return `
			<link rel="stylesheet" href="https://unicons.iconscout.com/release/v3.0.6/css/line.css">
			<link rel="stylesheet" href="./static/frontend/js/components/Statistic.css">
			
			<div id="statistic">
				<div id="header">
					<h4>Statistic</h4>
				</div>
				<div id="content">
					<a class="menu-item">
						<span><i class="uil uil-globe"></i></span>
						<h3>RANK</h3>
						<p><b>11</b></p>
					</a>
					<a class="menu-item">
						<span><i class="uil uil-arrow-growth"></i></span>
						<h3>WIN</h3>
						<p><b>5</b></p>
					</a>
					<a class="menu-item">
						<span><i class="uil uil-chart-down"></i></span>
						<h3>LOSE</h3>
						<p><b>2</b></p>
					</a>
				</div>
			</div>
		`;
	};

	connectedCallback() {
		this.shadowRoot.innerHTML = this.template();
	}

	disconnectedCallback() {
		// console.log("delete")
	}
}
