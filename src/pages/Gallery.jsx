import { useEffect, useState } from "react";
import { getInventory } from "../services/inventoryApi";

export default function Gallery(){

const [items,setItems]=useState([]);

useEffect(()=>{
 console.log("Gallery mounted");
 loadData();
},[]);

async function loadData(){
 const data=await getInventory();
 console.log("DATA:",data);
 setItems(data || []);
}

return(
<div>
<h1>Gallery</h1>

{items.map(i=>(
 <div key={i.id}>
  {i.inventory_name}
 </div>
))}

</div>
);
}