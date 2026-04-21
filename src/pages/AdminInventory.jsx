import { useEffect, useState } from "react";
import { getInventory, deleteItem } from "../services/inventoryApi";
import { useNavigate } from "react-router-dom";
import "./admin.css";

export default function AdminInventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);

      const data = await getInventory();
      setItems(data || []);
    } catch (e) {
      setError("Помилка завантаження даних");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm("Видалити елемент?");
    if (!ok) return;

    await deleteItem(id);
    setItems(items.filter((i) => i.id !== id));
  }

  // 🔥 LOADING STATE
  if (loading) {
    return <div className="state">⏳ Завантаження...</div>;
  }

  // 🔥 ERROR STATE
  if (error) {
    return <div className="state error">❌ {error}</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>📦 Inventory Admin</h1>

        <button className="addBtn" onClick={() => navigate("/create")}>
          ➕ Додати
        </button>
      </div>

      {/* 🔥 EMPTY STATE */}
      {items.length === 0 ? (
        <div className="state">📭 Немає даних</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Фото</th>
              <th>Назва</th>
              <th>Опис</th>
              <th>Дії</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.photo} className="img" />
                </td>

                <td>{item.inventory_name}</td>
                <td>{item.description}</td>

                <td className="actions">
                  <button onClick={() => navigate(`/details/${item.id}`)}>
                    View
                  </button>

                  <button onClick={() => navigate(`/edit/${item.id}`)}>
                    Edit
                  </button>

                  <button onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}