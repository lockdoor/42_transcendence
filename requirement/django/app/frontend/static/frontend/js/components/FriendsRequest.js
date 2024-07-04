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

export class FriendsRequest extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	template = () => {
		return `
			<link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
			<link rel="stylesheet" href="./static/frontend/js/components/FriendsRequest.css">
			
			<div id="friend-request">
				<div id="header">
					<h4>Notification</h4>
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
					<div id="content">
						<div id="profile-photo">
							<img src="${list.profileImg}" alt="Profile Photo">
						</div>
						<div id="text">
							<p><b>${list.name}</b> send you a friend request</p>
						</div>
					</div>
				</td>
				<td>
					<div>
						<button id="accept">
							<i class="uil uil-user-plus"></i> Accept
						</button>
						<button id="decline">
							<i class="uil uil-user-minus"></i> Decline
						</button>
					</div>
				</td>
			</tr>
		`).join('');
	}

	connectedCallback() {
		this.shadowRoot.innerHTML = this.template();
	}

	disconnectedCallback() {
		console.log("delete friend request components");
	}
}
