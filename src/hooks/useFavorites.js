import { useEffect, useState } from "react";

export default function useFavorites() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  function toggleFavorite(item){
    const exists = favorites.find(x=>x.id===item.id);

    if(exists){
      setFavorites(
        favorites.filter(x=>x.id!==item.id)
      );
    } else {
      setFavorites([...favorites,item]);
    }
  }

  return {
    favorites,
    toggleFavorite
  };
}