const template = document.createElement("template");

template.innerHTML = `
        <style>
            .modal{
                justify-content: center;
                align-items: center;
                position: fixed;
                display: none;
                inset: 0;
            }

            .modal{
                display: none; /* Hidden by default */
                position: fixed; /* Stay in place */
                z-index: 1; /* Sit on top */
                left: 0;
                top: 0;
                width: 100%; /* Full width */
                height: 100%; /* Full height */
                overflow: auto; /* Enable scroll if needed */
                background-color: rgb(0,0,0); /* Fallback color */
                background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
            }


            .modal .modal_content {
                background-color: white;
                position: relative;
                border-radius: 4px;
                max-width: 500px;
                padding: 40px;
                color: #333;
            }

            .modal[open]{
                display: flex;
            }
        </style>
        <div class="modal">
            <div class="modal_content">
            <login-modal></login-modal>
            <button type="button">Close</button>
            </div>
        </div>
    `;

export class ModalDialog extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector(".modal_content > button").onclick = () =>
      this.close_modal();
  }

  close_modal() {
    this.shadowRoot.querySelector(".modal").removeAttribute("open");
  }
}
