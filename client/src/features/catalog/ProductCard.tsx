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
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice"; // ✅ FIXED: must import it!

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  const isLoading = status === "pendingAddItem" + product.id;

  return (
    <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 15 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          color: "primary.main",
          fontSize: "0.8rem",
        }}
      />
      <CardMedia
        sx={{ height: 140, backgroundSize: "contain", bgcolor: "white" }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography
          gutterBottom
          color="secondary"
          variant="subtitle1"
          sx={{ fontWeight: "bold" }}
        >
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          loading={status.includes('pendingAddItem' + product.id)}
          onClick={() =>
            dispatch(addBasketItemAsync({ productId: product.id, quantity: 1 }))
          }
          variant="contained"
          size="small"
          sx={{ borderRadius: 2 }}
        >
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
