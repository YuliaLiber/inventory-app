const BASE_URL = "https://api.example.com/inventory";

let inventory = [
  {
    id: 1,
    inventory_name: "Laptop Pro",
    description: "Dell Pro Max 16 Laptop",
    photo: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/dell-plus/db14255/laptop-db14255t-copilot-pc-mg.png?fmt=png-alpha&pscan=auto&scl=1&hei=804&wid=1179&qlt=100,1&resMode=sharp2&size=1179,804&chrss=full",
  },
  {
    id: 2,
    inventory_name: "Phone",
    description: "Apple iPhone 17 Pro 512GB (Cosmic Orange)",
    photo: "https://smartbuy-me.com/cdn/shop/files/ABJ1401ST0049.jpg?v=1759585497&width=800",
  },
  {
    id: 3,
    inventory_name: "Laptop",
    description: "Dell 14 Plus Laptop",
    photo: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/dell/dell-15-intel-3530/media-gallery/laptop-dell-dc15250nt-bk-plastic-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=804&wid=1254&qlt=100,1&resMode=sharp2&size=1254,804&chrss=full",
  },
  {
    id: 4,
    inventory_name: "Phone Max",
    description: "Apple iPhone 17 Pro Max 256GB (Silver)",
    photo: "https://my-apple.com.ua/image/catalog/products/iphone/iphone-17-pro-max/iphone-17-pro-max-silver-1.png",
  },
  {
    id: 5,
    inventory_name: "Headphones",
    description: "Apple AirPods 4 (2024)",
    photo: "https://applehome.te.ua/wp-content/uploads/2024/09/42221.750.jpeg",
  },
  {
    id: 6,
    inventory_name: "Headphones Max",
    description: "Apple AirPods Max USB-C 2024 (Midnight)",
    photo: "https://www.mrfix.ua/storage/66f/172/db9/product-product-apple-airpods-max-usb-c-midnight-mww43-32843-500x500.webp",
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