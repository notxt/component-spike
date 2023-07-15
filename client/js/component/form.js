const template = document.createElement("template");
template.innerHTML = `
<pre id="debug"></pre>
<form>
    <input id="nameInput" type="text"></input>
    <button>submit</button>
</form>
`;

export class XForm extends HTMLElement {
  #data = { test: "test" };
  #debug;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.#debug = this.shadowRoot.getElementById("debug");

    const nameInput = this.shadowRoot.getElementById("nameInput");
    console.log(nameInput);

    nameInput.addEventListener("input", this.#updateName.bind(this));
  }

  connectedCallback() {
    this.#render();
  }

  #updateName(e) {
    console.log(e);

    this.#data.name = "new name";
    this.#render();
  }

  get data() {
    return this.#data;
  }

  #render() {
    const debug = JSON.stringify(this.#data, null, 2);
    console.log(debug);
    this.#debug.innerHTML = debug;
  }
}
