import { getList, getItem } from "./api.js";

import { XDetail } from "./component/detail.js";
import { XForm } from "./component/form.js";
import { XMenu } from "./component/menu.js";
import { XTable } from "./component/table.js";

customElements.define("x-detail", XDetail);
customElements.define("x-form", XForm);
customElements.define("x-menu", XMenu);
customElements.define("x-table", XTable);

const selected = (detail) => async (e) => {
  const item = await getItem(e.detail.id);
  detail.item = item;
};

const add = () => {
  console.log("add");

  history.pushState({}, "", "/add");
};

const main = async () => {
  const table = document.getElementById("table");
  const detail = document.getElementById("detail");
  const menu = document.getElementById("menu");
  const addBtn = document.getElementById("add");

  menu.addEventListener("focusout", menu.close.bind(menu));

  table.header = ["Name"];

  const list = await getList();
  table.rows = list;

  table.addEventListener("selected", selected(detail));

  addBtn.addEventListener("click", add);
};

const init = async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }
};

init();
