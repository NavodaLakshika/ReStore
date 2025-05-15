import { Box } from '@mui/material';
import { Product } from '../../app/models/product';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <Box 
    display="grid"
    gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: 'repeat(5, 1fr)', xl: 'repeat(5, 1fr)' }}
    gap={5}
    sx={{
      padding: "2rem",  // Add padding around the grid
      maxWidth: "1200px",  // Limit width to create a more consistent layout
      margin: "auto",  // Center the grid
    }}
  >
    {products.map((product) => (
      <Box key={product.id}>
        <ProductCard product={product} />
      </Box>
    ))}
  </Box>
  );
}
