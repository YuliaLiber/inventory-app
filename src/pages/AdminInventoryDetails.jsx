import { useEffect, useState } from "react";
import { getItem } from "../services/inventoryApi";
import { useParams, useNavigate } from "react-router-dom";
import "../pages/admin.css";

export default function AdminInventoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getItem(id);
    setItem(data);
  }

  if (!item) {
    return <div className="state">⏳ Завантаження...</div>;
  }

  return (
    <div className="card">
      <h2>{item.inventory_name}</h2>

      <img src={item.photo} className="bigImg" />

      <p>{item.description}</p>

      <button onClick={() => navigate(-1)} className="backBtn">
        ⬅ Назад
      </button>
    </div>
  );
}