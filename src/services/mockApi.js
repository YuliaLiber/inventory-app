const BASE_URL = "https://api.example.com/inventory";

let inventory = [
  {
    id: 1,
    inventory_name: "Laptop",
    description: "Powerful laptop",
    photo: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    inventory_name: "Phone",
    description: "Smartphone",
    photo: "https://via.placeholder.com/100",
  },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function mockFetch(url, options = {}) {
  await delay(300);

  const { method = "GET" } = options;

  if (url === BASE_URL && method === "GET") {
    return { json: async () => inventory };
  }

  if (url.startsWith(BASE_URL + "/") && method === "GET") {
    const id = Number(url.split("/").pop());
    return { json: async () => inventory.find((i) => i.id === id) };
  }

  if (url === BASE_URL && method === "POST") {
    const body = JSON.parse(options.body);
    const newItem = { id: Date.now(), ...body };
    inventory.push(newItem);
    return { json: async () => newItem };
  }

  if (url.startsWith(BASE_URL + "/") && method === "PUT") {
    const id = Number(url.split("/").pop());
    const body = JSON.parse(options.body);

    inventory = inventory.map((item) =>
      item.id === id ? { ...item, ...body } : item
    );

    return { json: async () => inventory.find((i) => i.id === id) };
  }

  if (url.startsWith(BASE_URL + "/") && method === "DELETE") {
    const id = Number(url.split("/").pop());
    inventory = inventory.filter((i) => i.id !== id);

    return { json: async () => ({ success: true }) };
  }
}