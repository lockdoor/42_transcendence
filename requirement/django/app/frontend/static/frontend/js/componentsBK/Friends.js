// const Mock_list = [
//   {
//     name: "Sarah",
//     profileImg: "./static/frontend/images/profile-2.jpg",
//     status: "Online",
//   },
//   {
//     name: "Jenny",
//     profileImg: "./static/frontend/images/profile-2.jpg",
//     status: "Offline",
//   },
//   {
//     name: "Lin",
//     profileImg: "./static/frontend/images/profile-2.jpg",
//     status: "Offline",
//   },
//   {
//     name: "Kim",
//     profileImg: "./static/frontend/images/profile-2.jpg",
//     status: "Online",
//   },
// ];

import { changeNotification } from "./Utils.js";

export class Friends extends HTMLElement {

  friends = []

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

	template = () => {
		return `
			<link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
			<link rel="stylesheet" href="./static/frontend/js/components/friends.css">
			
			<div id="friends">
				<div id="header">
					<h4>Friends</h4>
					<button id="findFriendsButton">
						<i class="uil uil-user-plus"></i> Find Friends
					</button>
				</div>
				<table>
					<tbody>
						${this.friends.length > 0 
              ? this.generateRows()
              : "No friend<div"}
					</tbody>
				</table>
			</div>
		`;
	};

  generateRows() {
    return this.friends.map(
      (list) => `
			<tr>
				<td>
					<div id="profile">
						<div id="profile-photo">
							<img src="${list.avatar}" alt="Profile Photo" 
                onerror="this.onerror=null; this.src='/user-media/avatars/default.png';">
						</div>
						<div id="profile-name">
							<p><b>${list.username}</b></p>
						</div>
					</div>
				</td>
				<td>
					<p class="${
            list.is_online == true
              ? "status-online"
              : "status-offline"
          }">
						${list.is_online == true ? 'Online' : 'Offline'}
					</p>
				</td>
				<td>
					<div id="icon">
						<i class="uil uil-user"></i>
						<i class="uil uil-comment-dots"></i>
						<i class="uil uil-upload"></i>
					</div>
				</td>
			</tr>
		`).join('');
	}

  getCSRFToken = () => {
    const csrfTokenElement = document.querySelector("[name=csrfmiddlewaretoken]");
    return csrfTokenElement ? csrfTokenElement.value : null;
  };
  
  fetchFriends = async () => {
    try {
      const csrfToken = this.getCSRFToken();
      if (!csrfToken) {
        throw new Error("CSRF token not found");
      }

      // will change on login keep user_id in local storege
      // then get user_id from local storege
      const user_id = 4
  
      const response = await fetch(`/api/users/${user_id}/friends`, {
        method: 'GET',
        credentials: "same-origin",
        headers: {
          "X-CSRFToken": csrfToken,
          "Content-Type": "application/json"
        },
      });
  
      if (!response.ok) {
        throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
      }

      this.friends = await response.json()
      this.render()

    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  render() {
    this.shadowRoot.innerHTML = ""
    this.shadowRoot.innerHTML = this.template();
  }

  connectedCallback() {
    this.render()
    this.fetchFriends()

		this.shadowRoot.querySelector('#findFriendsButton').addEventListener('click', () => {
			changeNotification("recommends-friends");
		});

		this.shadowRoot.querySelectorAll('.uil-user').forEach(icon => {
			icon.addEventListener('click', () => {
				changeNotification("friend-profile");
			});
		});

		this.shadowRoot.querySelectorAll('.uil-upload').forEach(icon => {
			icon.addEventListener('click', () => {
				changeNotification("invite-friend");
			});
		});
	}

}
