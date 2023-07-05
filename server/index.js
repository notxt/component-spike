import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { promises as fsPromises } from "fs";
import http from "http";
import { getList, getById } from "./lib/item.js";

const { readFile } = fsPromises;

const __dirname = dirname(fileURLToPath(import.meta.url));

const favicon = async (req, res) => {
  res.writeHead(204);
  res.end();
};

const clientDir = join(__dirname, "../client");

const index = async (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  const file = await readFile(`${clientDir}/index.html`);

  res.write(file);
  res.end();
  return;
};

const serverError = async (req, res) => {
  res.writeHead(500, { "Content-Type": "text/plain" });
  res.end();
};

const js = async (req, res) => {
  const { url } = req;

  if (typeof url === "undefined") {
    serverError(req, res);
    return;
  }

  const file = await readFile(join(clientDir, url));

  res.writeHead(200, {
    "Content-Type": "text/javascript",
  });
  res.write(file);
  res.end();
};

const notFound = async (req, res) => {
  res.writeHead(404);
  res.end();
};

const apiHeaders = {
  "Content-Type": "application/json",
};

const getItemList = async (req, res) => {
  const list = await getList();

  res.writeHead(200, apiHeaders);
  res.write(JSON.stringify(list));
  res.end();
};

const getItem = async (req, res) => {
  const { url } = req;

  const match = url.match(/^\/api\/item\/([0-9]+)$/);

  const idStr = match[1];

  let id;
  try {
    id = parseInt(idStr, 10);
  } catch (e) {
    console.error(e);
    res.writeHead(400, apiHeaders);
    res.write(JSON.stringify({ message: "id param is not an int" }));
    res.end();
    return;
  }

  let item;
  try {
    item = await getById(id);
  } catch (e) {
    res.writeHead(404, apiHeaders);
    res.write(JSON.stringify({ message: "Not Found" }));
    res.end();
    return;
  }

  res.writeHead(200, apiHeaders);
  res.write(JSON.stringify(item));
  res.end();
};

const api = async (req, res) => {
  const { url } = req;

  if (url === "/api/item") {
    getItemList(req, res);
    return;
  }

  if (/^\/api\/item\/[0-9]+$/.test(url)) {
    getItem(req, res);
    return;
  }

  res.writeHead(404, apiHeaders);
  res.write(JSON.stringify({ message: "Not Found" }));
  res.end();
};

const route = new Map();

route.set("/", index);
route.set("/favicon.ico", favicon);
route.set("/api/item", getItemList);

const router = (req, res) => {
  const { url } = req;

  console.log(url);

  if (typeof url === "undefined") {
    throw new Error("req.url is undefined");
  }

  if (url.startsWith("/api")) {
    api(req, res);
    return;
  }

  if (url.startsWith("/js")) {
    js(req, res);
    return;
  }

  const handler = route.get(url);

  if (typeof handler === "undefined") {
    notFound(req, res);
    return;
  }

  handler(req, res);
  return;
};

const host = "localhost";
const port = 8000;

const server = http.createServer(router);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
