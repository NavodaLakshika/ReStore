import { Box } from '@mui/material';
import { Product } from '../../app/models/product';
import ProductCard from './ProductCard';
import { useAppSelector } from '../../app/store/configureStore';
import ProductCardSkeleton from './ProductCardSkeleton'; // Optional, if you have a skeleton loader

interface Props {
  products: Product[];
  viewMode?: 'grid' | 'list';
}

export default function ProductList({ products, viewMode = 'grid' }: Props) {
  const { productsLoaded } = useAppSelector(state => state.catalog);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: viewMode === 'list' ? 'column' : 'row',
        flexWrap: 'wrap',
        gap: 3,
        justifyContent: 'flex-start',
      }}
    >
      {!productsLoaded
        ? Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        : products.map(product => (
            <Box key={product.id} sx={{ flex: '1 1 300px', maxWidth: 300 }}>
              <ProductCard product={product} />
            </Box>
          ))}
    </Box>
  );
}
