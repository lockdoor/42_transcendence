const Mock_list = [
	{
		name: 'Sarah',
		profileImg: '../images/profile-2.jpg'
	},
	{
		name: 'Jenny',
		profileImg: '../images/profile-2.jpg'
	},
	{
		name: 'Lin',
		profileImg: '../images/profile-2.jpg'
	},
	{
		name: 'Mint',
		profileImg: '../images/profile-2.jpg'
	},
	{
		name: 'Kim',
		profileImg: '../images/profile-2.jpg'
	}
];

export class BlockedList extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	template = () => {
		return `
			<link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
			<link rel="stylesheet" href="./static/frontend/js/components/BlockedList.css">
			
			<div id="blocked-list">
				<div id="header">
					<h4>Blocked List</h4>
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
					<button>
						<i class="uil uil-user-check"></i> Unblock
					</button>
				</td>
			</tr>
		`).join('');
	}

	connectedCallback() {
		this.shadowRoot.innerHTML = this.template();
	}

	disconnectedCallback() {
		console.log("delete blocked list components");
	}
}