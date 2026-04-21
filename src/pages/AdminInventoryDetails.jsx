import { useEffect, useState } from "react";
import { getItem } from "../services/inventoryApi";
import { useParams } from "react-router-dom";

export default function AdminInventoryDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    loadItem();
  }, []);

  async function loadItem() {
    const data = await getItem(id);
    setItem(data);
  }

  if (!item) return <h2>Завантаження...</h2>;

  return (
    <div>
      <h2>{item.inventory_name}</h2>
      <p>{item.description}</p>
      <img src={item.photo} width="200" />
    </div>
  );
}