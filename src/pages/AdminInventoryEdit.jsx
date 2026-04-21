import { useEffect, useState } from "react";
import { getItem, updateItem } from "../services/inventoryApi";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminInventoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    inventory_name: "",
    description: "",
  });

  useEffect(() => {
    loadItem();
  }, []);

  async function loadItem() {
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
    <div>
      <h2>Редагування</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="inventory_name"
          value={form.inventory_name}
          onChange={handleChange}
        />
        <br />

        <input
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Зберегти</button>
      </form>
    </div>
  );
}