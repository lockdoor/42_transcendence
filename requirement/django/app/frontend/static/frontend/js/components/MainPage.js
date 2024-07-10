export class MainPage extends HTMLElement{
	constructor(){
		super();
		this.shadow = this.attachShadow({ mode: "open" });
	}
}