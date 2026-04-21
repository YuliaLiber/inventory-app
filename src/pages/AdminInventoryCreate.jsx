import { useState } from "react";
import { createItem } from "../services/inventoryApi";
import { useNavigate } from "react-router-dom";

export default function AdminInventoryCreate() {
  const [form, setForm] = useState({
    inventory_name: "",
    description: "",
    photo: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.inventory_name) {
      alert("Назва обов’язкова");
      return;
    }

    await createItem(form);
    navigate("/");
  }

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <h2>➕ Додати інвентар</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="inventory_name"
          placeholder="Назва"
          onChange={handleChange}
        />
        <br />

        <input
          name="description"
          placeholder="Опис"
          onChange={handleChange}
        />
        <br />

        <input
          name="photo"
          placeholder="URL фото"
          onChange={handleChange}
        />
        <br />

        <button type="submit">Зберегти</button>
      </form>
    </div>
  );
}