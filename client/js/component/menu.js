const template = document.createElement("template");

template.innerHTML = `
<style>
button {
    background-color: transparent;
    border-width: 1px;
    color: rgb(68, 68, 68);
    font-family: "Helvetica", sans-serif;
}

.menu {
    display: none;
    position: absolute;
}
</style>

<button>Menu</button>
<div id="menu" class="menu">
 <a href="/">Logout</a>
<div>
`;

export class XMenu extends HTMLElement {
  #menu;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const button = this.shadowRoot.querySelector("button");
    this.#menu = this.shadowRoot.getElementById("menu");

    button.addEventListener("focus", this.#open.bind(this));
  }

  #open(e) {
    console.log("open", document.activeElement, e);

    this.#menu.style.display = "block";
  }

  close(e) {
    console.log("close", document.activeElement, e);

    this.#menu.style.display = "none";
  }
}
