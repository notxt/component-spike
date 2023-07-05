const template = document.createElement("template");
template.innerHTML = `
<style>
dt {
    font-weight: bold;
}
dd {
    margin-bottom: 10px;
    margin-left: 0px;
}
</style>
<dl></dl>`;

export class XDetail extends HTMLElement {
  #container;
  #item;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.#container = this.shadowRoot.querySelector("dl");
  }

  set item(item) {
    this.#item = item;
    this.#render();
  }

  #render() {
    this.#container.innerHTML = "";

    const item = this.#item;
    console.log(item);

    if (!item) {
      return;
    }

    const nodes = [];

    const idTitle = document.createElement("dt");
    idTitle.innerText = "id";
    nodes.push(idTitle);

    const id = document.createElement("dd");
    id.innerText = item.id;
    nodes.push(id);

    const nameTitle = document.createElement("dt");
    nameTitle.innerText = "name";
    nodes.push(nameTitle);

    const name = document.createElement("dd");
    name.innerText = item.name;
    nodes.push(name);

    this.#container.append(...nodes);
  }
}
