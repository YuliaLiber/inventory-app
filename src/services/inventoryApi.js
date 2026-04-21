import { mockFetch } from "./mockApi";

const BASE_URL = "https://api.example.com/inventory";

export async function getInventory() {
  const res = await mockFetch(BASE_URL);
  return res.json();
}

export async function getItem(id) {
  const res = await mockFetch(`${BASE_URL}/${id}`);
  return res.json();
}

export async function createItem(data) {
  const res = await mockFetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function updateItem(id, data) {
  const res = await mockFetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deleteItem(id) {
  const res = await mockFetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return res.json();
}