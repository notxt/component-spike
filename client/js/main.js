import { getList, getItem } from "./api.js";
import { XTable } from "./component/table.js";
import { XDetail } from "./component/detail.js";

customElements.define("x-table", XTable);
customElements.define("x-detail", XDetail);

const selected = (detail) => async (e) => {
  console.log("selected", e);

  const item = await getItem(e.detail.id);
  detail.item = item;
};

const main = async () => {
  const table = document.getElementById("table");
  const detail = document.getElementById("detail");

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
