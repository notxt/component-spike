const template = document.createElement("template");
template.innerHTML = `
<style>
thead tr {
  font-weight: bold
}
tbody tr {
  border-top-color: rgb(68, 68, 68);
  border-top-style: solid;
  border-top-width: 1px;
  cursor: pointer;
}
</style>
<form>
  <input id="filter" type="text" placeholder="filter"></input>
<form>
<table></table>
`;

export class XTable extends HTMLElement {
  #filter;
  #filterStr;
  #table;
  #header = [];
  #rows = [];

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.#table = this.shadowRoot.querySelector("table");
    this.#filter = this.shadowRoot.getElementById("filter");

    console.log(this.#filter);

    this.#filter.addEventListener("input", (event) => {
      event.preventDefault();
      this.#filterStr = event.target.value;
      this.#render();
    });
  }

  set header(header) {
    this.#header = header;
    this.#render();
  }

  set rows(rows) {
    this.#rows = rows;
    this.#render();
  }

  #renderHeader() {
    const header = document.createElement("thead");
    const row = document.createElement("tr");

    const cells = this.#header.map((name) => {
      const td = document.createElement("td");
      td.innerHTML = name;

      return td;
    });

    row.append(...cells);
    header.appendChild(row);

    return header;
  }

  #renderBody() {
    const body = document.createElement("tbody");

    const filterStr = this.#filterStr;

    const rows = this.#rows
      .filter(({ name }) => {
        if (typeof filterStr === "undefined") return true;
        if (filterStr === "") return true;

        return name.includes(filterStr);
      })
      .map(({ name, id }) => {
        const rowEl = document.createElement("tr");

        rowEl.addEventListener("click", () => {
          const event = new CustomEvent("selected", { detail: { id } });
          this.dispatchEvent(event);
        });

        const nameCell = document.createElement("td");
        nameCell.innerHTML = name;

        rowEl.append(nameCell);

        return rowEl;
      });

    body.append(...rows);

    return body;
  }

  #render() {
    const header = this.#renderHeader();
    const body = this.#renderBody();

    this.#table.innerHTML = "";
    this.#table.append(header, body);
  }
}
