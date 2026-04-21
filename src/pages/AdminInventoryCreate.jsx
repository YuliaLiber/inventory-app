import { useState } from "react";
import { createItem } from "../services/inventoryApi";
import { useNavigate } from "react-router-dom";
import "../pages/admin.css";

export default function AdminInventoryCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    inventory_name: "",
    description: "",
    photo: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.inventory_name) {
      alert("Назва обовʼязкова");
      return;
    }

    await createItem(form);
    navigate("/");
  }

  return (
    <div className="card">
      <h2>➕ Додати елемент</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          name="inventory_name"
          placeholder="Назва"
          onChange={handleChange}
        />

        <input
          name="description"
          placeholder="Опис"
          onChange={handleChange}
        />

        <input
          name="photo"
          placeholder="URL фото"
          onChange={handleChange}
        />

        <button type="submit">Зберегти</button>
      </form>
    </div>
  );
}