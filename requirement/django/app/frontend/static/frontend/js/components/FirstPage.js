import { navigateToForMainPage } from "../index.js";

export class FirstPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  template = () => {
    return `
			<link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
			<link rel="stylesheet" href="./static/frontend/js/components/firstPage.css">
			
			<div id="nav">
				<div id="bg">
					<button id="signIn-btn">SIGN IN</button>
					<modal-dialog>
    					<p>Ut velit commodo elit reprehenderit anim pariatur velit aliquip proident aliquip do sint magna dolore dolor excepteur nisi consectetur eu ex aliquip.</p>
					</modal-dialog>
					<p id="text-join">to join the TOURNAMENT !</p>
				</div>
			</div>
			
			<div id="gameTag">
				<p>Game</p>
			</div>
			
			<div id="footer">
				<p>
					@ 2024, Made with 
					<i class="uil uil-heart-alt"></i> 
					by 
					<span>42 Baby Cadet</span>
				</p>
			</div>
		`;
  };

  connectedCallback() {
    this.shadowRoot.innerHTML = this.template();
    this.shadowRoot
      .getElementById("signIn-btn")
      .addEventListener("click", () => {
        this.shadowRoot
          .getElementById("nav")
          .querySelector("modal-dialog")
          .shadowRoot.querySelector(".modal")
          .setAttribute("open", "open");
      });
    // document
    //   .querySelector("modal-dialog")
    //   .shadowRoot.querySelector(".modal")
    //   .setAttribute("open", "open");
    // var loginBtn = this.shadowRoot.getElementById("signIn-btn");
    // var loginText = this.shadowRoot.getElementById("signIn-text");
    // var loginModal = this.shadowRoot.getElementById("loginModal");
    // var registerText = this.shadowRoot.getElementById("signUp-text");
    // var registerModal = this.shadowRoot.getElementById("registerModal");
    // var closeLogin =
    //   this.shadowRoot.childNodes[5].getElementsByClassName("closeIcon")[0];
    // var closeRegister =
    //   this.shadowRoot.childNodes[5].getElementsByClassName("closeIcon")[1];

    // loginBtn.onclick = function () {
    //   loginModal.style.display = "flex";
    // };

    // loginText.onclick = function () {
    //   loginModal.style.display = "flex";
    //   registerModal.style.display = "none";
    // };

    // closeLogin.onclick = function () {
    //   loginModal.style.display = "none";
    // };

    // registerText.onclick = function () {
    //   loginModal.style.display = "none";
    //   registerModal.style.display = "flex";
    // };

    // closeRegister.onclick = function () {
    //   registerModal.style.display = "none";
    // };
  }
}

// window.show_modal = () => {
//   this.shadowRoot
//     .querySelector("modal-dialog")
//     .shadowRoot.querySelector(".modal")
//     .setAttribute("open", "open");
// };
