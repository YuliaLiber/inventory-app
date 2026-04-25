import { useEffect, useState } from "react";
import { getInventory } from "../services/inventoryApi";
import InventoryCard from "../components/gallery/InventoryCard";

export default function Gallery() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const data = await getInventory();
    setItems(data || []);
  }

  function handleQuickView(item) {
    alert(`${item.inventory_name}\n\n${item.description}`);
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1>📦 Inventory Gallery</h1>

      {items.length === 0 ? (
        <p>Список порожній</p>
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
    </div>
  );
}