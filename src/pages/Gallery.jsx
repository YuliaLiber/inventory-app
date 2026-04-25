import { useEffect, useState } from "react";
import { getInventory } from "../services/inventoryApi";
import InventoryCard from "../components/gallery/InventoryCard";
import InventoryQuickView from "../components/gallery/InventoryQuickView";
import "../pages/admin.css";

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const data = await getInventory();
    setItems(data || []);
  }

  function handleQuickView(item) {
    setSelectedItem(item);
  }

  function closeModal() {
    setSelectedItem(null);
  }

  return (
    <div className="container">
      <h1>📦 Inventory Gallery</h1>

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