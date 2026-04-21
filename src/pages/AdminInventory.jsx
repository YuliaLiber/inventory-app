import { useEffect, useState } from "react";
import { getInventory, deleteItem } from "../services/inventoryApi";
import { useNavigate } from "react-router-dom";

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
      const data = await getInventory();
      setItems(data || []);
    } catch (e) {
      setError("Помилка завантаження");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Точно видалити?");
    if (!confirmDelete) return;

    await deleteItem(id);
    setItems(items.filter((item) => item.id !== id));
  }

  if (loading) return <h2>Завантаження...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div style={{ maxWidth: "900px", margin: "50px auto" }}>
      <h1>📦 Inventory Admin</h1>

      <button onClick={() => navigate("/create")}>
        ➕ Додати
      </button>

      {items.length === 0 ? (
        <p>Список порожній</p>
      ) : (
        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr>
              <th>Назва</th>
              <th>Опис</th>
              <th>Фото</th>
              <th>Дії</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.inventory_name}</td>
                <td>{item.description}</td>
                <td>
                  <img src={item.photo} width="50" />
                </td>
                <td>
                  <button onClick={() => navigate(`/details/${item.id}`)}>
                    👁 View
                  </button>

                  <button onClick={() => navigate(`/edit/${item.id}`)}>
                    ✏️ Edit
                  </button>

                  <button onClick={() => handleDelete(item.id)}>
                    ❌ Delete
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