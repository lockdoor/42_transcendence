export class Notification extends HTMLElement{
	constructor(){
		super();
	}

	connectedCallback(){
		this.shadow = this.attachShadow({ mode: "open" });
		this.textElement = document.createElement("div");
		// this.textElement.textContent = "notification";

		const css = document.createElement("link");
		css.setAttribute("rel","stylesheet");
		css.setAttribute("href","./static/frontend/js/components/notification.css");

		this.shadow.appendChild(css);
		this.shadow.appendChild(this.textElement)
	}
}