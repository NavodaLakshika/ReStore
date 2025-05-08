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
import { useState } from "react";
import { agent } from "../../app/api/agent";
import { useStoreContext } from "../../app/api/context/StoreContext";
import { currencyFormat } from "../../app/util/util";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);
  const { setBasket } = useStoreContext();

  const handleAddItem = async (productId: number) => {
    setLoading(true);
    try {
      const basket = await agent.Basket.addItem(productId);
      setBasket(basket);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
          fontWeight: "bold",
          color: "primary.main",
          fontSize: "1.0rem",
        }}
      />
      <CardMedia
        sx={{ height: 120, backgroundSize: "contain", bgcolor: "grey.100" }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography
          gutterBottom
          color="secondary"
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {currencyFormat(product.price)}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: "bold" }}
        >
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <LoadingButton
          loading={loading}
          onClick={() => handleAddItem(product.id)}
          variant="contained"
          size="small"
          sx={{ borderRadius: 2 }}
        >
          Add to Cart
        </LoadingButton>
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
