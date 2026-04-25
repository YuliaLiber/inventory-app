export default function InventoryQuickView({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="modalOverlay">
      <div className="modalBox">

        <button className="closeBtn" onClick={onClose}>
          ✕
        </button>

        <img src={item.photo} alt={item.inventory_name} />

        <h2>{item.inventory_name}</h2>

        <p>{item.description}</p>

      </div>
    </div>
  );
}