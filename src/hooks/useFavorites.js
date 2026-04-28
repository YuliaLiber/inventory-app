import { useState, useEffect } from "react";

export default function useFavorites() {

const [favorites,setFavorites]=useState(()=>{
const saved=localStorage.getItem("favorites");
return saved ? JSON.parse(saved) : [];
});

useEffect(()=>{
localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);
},[favorites]);

function toggleFavorite(item){

const exists=favorites.some(
f=>f.id===item.id
);

if(exists){
setFavorites(
favorites.filter(
f=>f.id!==item.id
)
);
}
else{
setFavorites([
...favorites,
item
]);
}

}

return {
favorites,
toggleFavorite
};

}