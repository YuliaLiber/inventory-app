import useFavorites from "../hooks/useFavorites";

export default function Favorites(){

const {favorites}=useFavorites();

return(
<div className="container">
<h1>❤️ Favorites</h1>

{favorites.length===0 ? (
<p>Немає обраних товарів</p>
) : (

<div className="galleryGrid">
{favorites.map(item=>(
<div className="productCard" key={item.id}>
<img src={item.photo}/>
<h3>{item.inventory_name}</h3>
<p>{item.description}</p>
</div>
))}
</div>

)}

</div>
)
}