import { Box, Grid } from '@mui/material';
import { Product } from '../../app/models/product';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <Grid display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={4}>
      {products.map((product) => (
        <Grid key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
