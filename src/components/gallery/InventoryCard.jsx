import useFavorites from "../../hooks/useFavorites";

export default function InventoryCard({ item, onQuickView }) {
  const { favorites, toggleFavorite } = useFavorites();

  const isFav = favorites.some(f => f.id === item.id);

  return (
    <div className="productCard">

      <button
        className="favoriteIcon"
        onClick={() => toggleFavorite(item)}
      >
        {isFav ? "❤️" : "🤍"}
      </button>

      <img
        src={item.photo}
        alt={item.inventory_name}
      />

      <h3>{item.inventory_name}</h3>

      <p>{item.description}</p>

      <button onClick={() => onQuickView(item)}>
        Quick View
      </button>

    </div>
  );
}