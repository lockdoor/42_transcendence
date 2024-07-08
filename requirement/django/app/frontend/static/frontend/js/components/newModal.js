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

            .modal::before{
                background-color: rgba(0,0,0,0.8);
                position: fixed;
                content: "";
                inset: 0;
            }

            .modal .modal_content {
                background-color: var(--col_1);
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
            <div class="content"></div>
            <button type="button">Close</button>
            </div>
        </div>
    `;

export class ModalDialog extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector(".content").innerHTML = this.innerHTML;
    this.shadowRoot.querySelector(".modal_content > button").onclick = () =>
      this.close_modal();
  }

  close_modal() {
    this.shadowRoot.querySelector(".modal").removeAttribute("open");
  }
}
