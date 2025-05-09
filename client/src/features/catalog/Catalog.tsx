import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { agent } from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Catalog.list()
            .then((products) => setProducts(products)) // Set products state with the fetched data
            .catch((error) => console.log(error))      // Log error if any
            .finally(() => setLoading(false));         // Set loading to false after fetch
    }, []);

    if (loading) return <LoadingComponent message="Loading Products..." />;

    return (
        <>
            <ProductList products={products} />
        </>
    );
}
