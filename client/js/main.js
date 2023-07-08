import { getList, getItem } from "./api.js";
import { XTable } from "./component/table.js";
import { XDetail } from "./component/detail.js";
import { XMenu } from "./component/menu.js";

customElements.define("x-table", XTable);
customElements.define("x-detail", XDetail);
customElements.define("x-menu", XMenu);

const selected = (detail) => async (e) => {
  console.log("selected", e);

  const item = await getItem(e.detail.id);
  detail.item = item;
};

const main = async () => {
  const table = document.getElementById("table");
  const detail = document.getElementById("detail");
  const menu = document.getElementById("menu");

  menu.addEventListener("focusout", menu.close.bind(menu));

  table.header = ["Name"];

  const list = await getList();
  table.rows = list;

  table.addEventListener("selected", selected(detail));
};

const init = async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }
};

init();
