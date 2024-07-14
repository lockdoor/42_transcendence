const Mock_hx = [
	{
		matchType: 'Tournament',
		date: '7 Jun 2024',
		opponentPlayer: 'Sarah',
		outcome: 'lose',
	},
	{
		matchType: '1 vs 1',
		date: '7 Jun 2024',
		opponentPlayer: 'Sarah',
		outcome: 'lose',
	},
	{
		matchType: '1 vs 1',
		date: '7 Jun 2024',
		opponentPlayer: 'Sarah',
		outcome: 'lose',
	},
	{
		matchType: 'Tournament',
		date: '7 Jun 2024',
		opponentPlayer: 'Sarah',
		outcome: 'lose',
	},
	{
		matchType: 'Tournament',
		date: '7 Jun 2024',
		opponentPlayer: 'Sarah',
		outcome: 'lose',
	},
	{
		matchType: 'Tournament',
		date: '7 Jun 2024',
		opponentPlayer: 'Sarah',
		outcome: 'lose',
	}
];

export class MatchHistory extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	template = () => {
		return `
			<link rel="stylesheet" href="${window.location.origin}/static/frontend/js/components/MatchHistory.css">
			
			<div id="match-hx">
				<div id="header">
					<h4>Match History</h4>
				</div>
				<table>
					<thead>
						<tr>
							<th>Type</th> 
							<th>Date</th>
							<th>Opponent player</th>
							<th>Outcome</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		`;
	};

	connectedCallback() {
		this.shadowRoot.innerHTML = this.template();
		
		const tbody = this.shadowRoot.querySelector('table tbody');

		Mock_hx.forEach(mock => {
			const tr = document.createElement('tr');
			const trContent = `
				<td>${mock.matchType}</td>
				<td>${mock.date}</td>
				<td>${mock.opponentPlayer}</td>
				<td>${mock.outcome}</td>
			`;
			tr.innerHTML = trContent;
			tbody.appendChild(tr);
		});
	}

	disconnectedCallback() {
		console.log("delete match history components");
	}
}

	// <tr>
	// <td>Tournament</td>
	// <td>7 Jun 2024</td>
	// <td>Sarah</td>
	// <td>lose</td>
	// </tr> 
