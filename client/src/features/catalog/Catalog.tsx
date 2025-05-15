import { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { fetchProductsAsync, productSlectors } from "./catalogSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

export default function Catalog() {
   const products = useAppSelector(productSlectors.selectAll);
   const { productsLoaded, status } = useAppSelector(state => state.catalog);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (!productsLoaded) dispatch(fetchProductsAsync());
   }, [productsLoaded, dispatch]);

   if (status.includes('pending')) {
      return <LoadingComponent message="Loading Products..." />;
   }

   return (
      <>
         <ProductList products={products} />
      </>
   );
}
