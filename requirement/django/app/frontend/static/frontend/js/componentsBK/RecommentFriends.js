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
		name: 'Kim',
		profileImg: '../images/profile-2.jpg'
	}
];

export class RecommentFriends extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	template = () => {
		return `
			<link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
			<link rel="stylesheet" href="./static/frontend/js/components/recommentFriends.css">
			
			<div id="recommend-friend">
				<div id="header">
					<h4>Recommend Friends</h4>
				</div>
				<table>
					<tbody>
						${this.generateRows()}
					</tbody>
				</table>
			</div>
		`;
	}

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
						<i class="uil uil-user-plus"></i> Send Request
					</button>
				</td>
			</tr>
		`).join('');
	}

	connectedCallback() {
		this.shadowRoot.innerHTML = this.template();
	}

	disconnectedCallback() {
		console.log("delete recommend friend components");
	}
}
