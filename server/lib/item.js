const count = 10000;
const list = [];

for (let id = 1; id <= count; id++) {
  const item = {
    id,
    name: `Item ${id}`,
  };

  list.push(item);
}

export const getList = async () => list;

export const getById = async (id) => {
  const item = list.find((item) => item.id === id);

  if (typeof item === "undefined") throw new Error("Not Found");

  return item;
};
