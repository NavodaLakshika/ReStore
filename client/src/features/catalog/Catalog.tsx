
import { Product } from "../../app/models/product";

import { useState, useEffect } from "react";
import ProductList from "./ProductList";



export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    
      useEffect(() => {
        fetch('http://localhost:5000/api/products')
          .then(response => response.json())
          .then((data) => setProducts(data))
          .catch((error) => {
            console.log("Error fetching products: ", error);
          });
      }, []); // Only run once when component mounts
    
      
    
    return (
        <>
            <ProductList products={products}/>
          
               
        </>
    );
}
        
     // <>
         //<List>
             // {products.map(product=>(
                //  <ListItem key={product.name}>

                 //   <ListItemAvatar>
                  //      <Avatar src={product.pictureUrl}/>
                 //   </ListItemAvatar>
                 //   <ListItemText>
                 ///       {product.name} - {product.price}
                 //   </ListItemText>
                //  </ListItem>
             // ))}
      //</List>

     // <Button onClick={addProduct}>Add product</Button>
      //</>
    
