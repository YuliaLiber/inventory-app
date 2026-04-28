import { useEffect, useState } from "react";
import { getInventory } from "../services/inventoryApi";
import InventoryCard from "../components/gallery/InventoryCard";
import InventoryQuickView from "../components/gallery/InventoryQuickView";
import "../pages/admin.css";

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);

      const data = await getInventory();
      setItems(data || []);
    } catch (err) {
      setError("Помилка завантаження даних");
    } finally {
      setLoading(false);
    }
  }

  function handleQuickView(item) {
    setSelectedItem(item);
  }

  function closeModal() {
    setSelectedItem(null);
  }

  if (loading) {
    return (
      <div className="container">
        <h2 className="state">⏳ Завантаження...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h2 className="state error">❌ {error}</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>📦 Inventory Gallery</h1>

      {/* empty state */}
      {items.length === 0 ? (
        <p className="state">Список порожній</p>
      ) : (
        <div className="galleryGrid">
          {items.map((item) => (
            <InventoryCard
              key={item.id}
              item={item}
              onQuickView={handleQuickView}
            />
          ))}
        </div>
      )}

      {/* MODAL */}
      <InventoryQuickView
        item={selectedItem}
        onClose={closeModal}
      />
    </div>
  );
}