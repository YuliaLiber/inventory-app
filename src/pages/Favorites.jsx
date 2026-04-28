import useFavorites from "../hooks/useFavorites";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="container">
      <h1>❤️ Favorites</h1>

      <div className="galleryGrid">
        {favorites.length === 0 ? (
          <p className="state">Немає улюблених</p>
        ) : (
          favorites.map(item => (
            <div className="productCard" key={item.id}>
              <img src={item.photo} />
              <h3>{item.inventory_name}</h3>
              <p>{item.description}</p>

              <button onClick={() => removeFavorite(item.id)}>
                Remove ❌
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}