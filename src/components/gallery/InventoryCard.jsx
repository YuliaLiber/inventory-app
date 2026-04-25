export default function InventoryCard({ item, onQuickView }) {
  return (
    <div className="productCard">

      <img src={item.photo} alt={item.inventory_name} />

      <h3>{item.inventory_name}</h3>

      <p>{item.description}</p>

      <button onClick={() => {
        console.log("CLICKED");
        onQuickView(item);
      }}>
        Quick View
      </button>

    </div>
  );
}