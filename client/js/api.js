class NotFoundError extends Error {
  constructor(message) {
    super(message);
  }
}

class ApiError extends Error {
  constructor(message) {
    super(message);
  }
}

export const getList = async () => {
  const response = await fetch("/api/item");
  const list = await response.json();

  return list;
};

export const getItem = async (id) => {
  const response = await fetch(`/api/item/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new NotFoundError("Not Found");
    }

    throw new ApiError("API Error");
  }

  const item = await response.json();

  return item;
};
