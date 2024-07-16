import { DashBoardPage } from "./components/DashBoardPage.js"
import { Profile } from "./components/Profile.js"
import { Tournament } from "./components/Tournament.js"
import { TournamentUpcoming } from "./components/TournamentUpcoming.js"
import { Notification } from "./components/Notification.js"
import { Friends } from "./components/Friends.js"
import { LiveChat } from "./components/LiveChat.js"
import { AccountManagment } from "./components/AccountManagment.js"
import { Statistic } from "./components/Statistic.js"
import { MatchHistory } from "./components/MatchHistory.js"
import { BlockedList } from "./components/BlockedList.js"
import { RecommendFriends } from "./components/RecommendFriends.js"


customElements.define("dashboard-component", DashBoardPage)
customElements.define("profile-component", Profile)
customElements.define("tournament-component", Tournament)
customElements.define("tournament-upcomming-component", TournamentUpcoming)
customElements.define("notification-component", Notification)
customElements.define("friends-component", Friends)
customElements.define("live-chat-component", LiveChat)
customElements.define("account-management-component", AccountManagment)
customElements.define("statistic-component", Statistic)
customElements.define("match-history-component", MatchHistory)
customElements.define("blocked-list-component", BlockedList)
customElements.define("recommend-friend-component", RecommendFriends)