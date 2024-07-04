import { DashBoardPage } from "./components/DashBoardPage.js";
import { Profile } from "./components/Profile.js";
import { FirstPage } from "./components/FirstPage.js";
import { MainPage } from "./components/MainPage.js";
import { Notification } from "./components/Notification.js";
import { MatchHistory } from "./components/MatchHistory.js";
import { RecommentFriends } from "./components/RecommentFriends.js";
import { TournamentUpcoming } from "./components/TournamentUpcoming.js";
import { Tournament } from "./components/Tournament.js";
import { TournamentStart } from "./components/TournamentStart.js";
import { TournamentOngoing } from "./components/TournamentOngoing.js";
import { Friends } from "./components/Friends.js";
import { LiveChat } from "./components/LiveChat.js";
import { AccountManagment } from "./components/AccountManagment.js";
import { FriendProfile } from "./components/FriendProfile.js";
import { FriendsRequest } from "./components/FriendsRequest.js";
import { Statistic } from "./components/Statistic.js";
import { BlockedList } from "./components/BlockedList.js";
import { InviteFriend } from "./components/InviteFriend.js";
import { LoginModal } from "./components/LoginModal.js";
import { RegisterModal } from "./components/RegisterModal.js";

customElements.define("register-modal",RegisterModal);
customElements.define("login-modal",LoginModal);
customElements.define("block-list", BlockedList);
customElements.define("invite-friend", InviteFriend);
customElements.define("statis-tic", Statistic);
customElements.define("friends-request", FriendsRequest);
customElements.define("account-managment", AccountManagment);
customElements.define("friend-profile", FriendProfile);
customElements.define("pro-file", Profile);
customElements.define("main-page", MainPage);
customElements.define("first-page", FirstPage);
customElements.define("dashboard-page", DashBoardPage);
customElements.define("notifi-cation", Notification);
customElements.define("match-history", MatchHistory);
customElements.define("recommends-friends", RecommentFriends);
customElements.define("live-chat", LiveChat);
customElements.define("friends-block", Friends);
customElements.define("tournament-start", TournamentStart);
customElements.define("tour-na-ment", Tournament);
customElements.define("tournament-ongoing", TournamentOngoing);
customElements.define("tournament-upcoming", TournamentUpcoming);

export function navigateToForMainPage(path) {
	const container = document.querySelector("main-page");

	if (path.indexOf("dashboard-page") > 0) {
		if (container.shadowRoot.hasChildNodes())
			container.shadowRoot.removeChild(container.shadowRoot.firstChild);
		const textElement = document.createElement("dashBoard-page");
		container.shadowRoot.appendChild(textElement);
	} else if (path.indexOf("first-page") > 0) {
		if (container.shadowRoot.hasChildNodes())
			container.shadowRoot.removeChild(container.shadowRoot.firstChild);
		const textElement = document.createElement("first-page");
		container.shadowRoot.appendChild(textElement);
	}
}

navigateToForMainPage("/first-page")
// navigateToForMainPage("/dashboard-page");
