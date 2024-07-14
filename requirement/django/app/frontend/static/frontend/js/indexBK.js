import { DashBoardPage } from "./componentsBK/DashBoardPage.js.js";
import { Profile } from "./componentsBK/Profile.js.js";
import { FirstPage } from "./componentsBK/FirstPage.js.js";
import { MainPage } from "./componentsBK/MainPage.js.js";
import { Notification } from "./componentsBK/Notification.js.js";
import { MatchHistory } from "./componentsBK/MatchHistory.js.js";
import { RecommentFriends } from "./componentsBK/RecommentFriends.js.js";
import { TournamentUpcoming } from "./componentsBK/TournamentUpcoming.js.js";
import { Tournament } from "./componentsBK/Tournament.js.js";
import { TournamentStart } from "./componentsBK/TournamentStart.js.js";
import { TournamentOngoing } from "./componentsBK/TournamentOngoing.js.js";
import { Friends } from "./componentsBK/Friends.js.js";
import { LiveChat } from "./componentsBK/LiveChat.js.js";
import { AccountManagment } from "./componentsBK/AccountManagment.js.js";
import { FriendProfile } from "./componentsBK/FriendProfile.js.js";
import { FriendsRequest } from "./componentsBK/FriendsRequest.js.js";
import { Statistic } from "./componentsBK/Statistic.js.js";
import { BlockedList } from "./componentsBK/BlockedList.js.js";
import { InviteFriend } from "./componentsBK/InviteFriend.js.js";
import { LoginModal } from "./componentsBK/LoginModal.js";
import { RegisterModal } from "./componentsBK/RegisterModal.js.js";
import { ModalDialog } from "./componentsBK/newModal.js.js";

customElements.define("modal-dialog", ModalDialog);
customElements.define("register-modal", RegisterModal);
customElements.define("login-modal", LoginModal);
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

// window.show_modal = () => {
//   document
//     .querySelector("modal-dialog")
//     .shadowRoot.querySelector(".modal")
//     .setAttribute("open", "open");
// };

navigateToForMainPage("/first-page");
// navigateToForMainPage("/dashboard-page");

//logic for change first-page -> dashboard-page is inside LoginModal.js

