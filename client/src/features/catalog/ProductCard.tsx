import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Product } from "../../app/models/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          fontWeight: 'bold',
          color: 'primary.main',
          fontSize: '1.1rem',
        }}
      />
      <CardMedia
        sx={{ height: 200, backgroundSize: 'contain', bgcolor: 'grey.100' }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          ${(product.price / 1000).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button variant="contained" size="small" sx={{ borderRadius: 2 }}>
          Add to Cart
        </Button>
        <Button
          component={Link}
          to={`/catalog/${product.id}`}
          variant="outlined"
          size="small"
          sx={{ borderRadius: 2 }}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
