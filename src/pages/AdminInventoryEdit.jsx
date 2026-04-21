import { useEffect, useState } from "react";
import { getItem, updateItem } from "../services/inventoryApi";
import { useParams, useNavigate } from "react-router-dom";
import "../pages/admin.css";

export default function AdminInventoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    inventory_name: "",
    description: "",
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getItem(id);
    setForm(data);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await updateItem(id, form);
    navigate("/");
  }

  return (
    <div className="card">
      <h2>✏️ Edit</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          name="inventory_name"
          value={form.inventory_name || ""}
          onChange={handleChange}
        />

        <input
          name="description"
          value={form.description || ""}
          onChange={handleChange}
        />

        <button type="submit">Оновити</button>
      </form>
    </div>
  );
}