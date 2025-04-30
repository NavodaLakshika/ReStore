import { Box, Grid } from '@mui/material';
import { Product } from '../../app/models/product';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <Box 
      display="grid" 
      gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: 'repeat(4, 1fr)' }}
      gap={4}
    >
      {products.map((product) => (
        <Box key={product.id}>
          <ProductCard product={product} />
        </Box>
      ))}
    </Box>
  );
}
