const Mock_list = [
	{
		name: 'Sarah',
		profileImg: '../images/profile-2.jpg',
		status: 'Waiting'
	},
	{
		name: 'Prem',
		profileImg: '../images/profile-1.jpg',
		status: 'Ready'
	}
];

export class InviteFriend extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	template = () => {
		return `
			<link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
			<link rel="stylesheet" href="./static/frontend/js/components/InviteFriend.css">
			
			<div id="invite-friend">
				<div id="header">
					<h4>Pong Game</h4>
				</div>
				<table>
					<tbody>
						${this.generateRows()}
					</tbody>
				</table>
			</div>
		`;
	};

	generateRows() {
		return Mock_list.map(list => `
			<tr>
				<td>
					<div id="profile">
						<div id="profile-photo">
							<img src="${list.profileImg}" alt="Profile Photo">
						</div>
						<div id="profile-name">
							<p><b>${list.name}</b></p>
						</div>
					</div>
				</td>
				<td>
					<p class="${list.status === 'Ready' ? 'status-ready' : list.status === 'Waiting' ? 'status-waiting' : 'status-waiting'}">
						${list.status}
					</p>
				</td>
			</tr>
		`).join('');
	}

	connectedCallback() {
		this.shadowRoot.innerHTML = this.template();
	}

	disconnectedCallback() {
		console.log("delete invite-friend components");
	}
}