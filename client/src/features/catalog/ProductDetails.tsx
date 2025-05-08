import {
  Divider,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  CircularProgress,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import { agent } from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import { useStoreContext } from "../../app/api/context/StoreContext";

export default function ProductDetails() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const item = basket?.items.find(i => i.productId === product?.id);

  useEffect(() => {
    setLoading(true);
    if (item) setQuantity(item.quantity);

    agent.Catalog.details(parseInt(id!))
      .then(response => setProduct(response))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [id, item]);

  function handleUpdateCard() {
    setSubmitting(true);
    if (!item || quantity > item.quantity) {
      const updateQuantity = item ? quantity - item.quantity : quantity;
      agent.Basket.addItem(product?.id!, updateQuantity)
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setSubmitting(false));
    } else {
      const updateQuantity = item.quantity - quantity;
      agent.Basket.removeItem(product?.id!, updateQuantity)
        .then(() => removeItem(product?.id!, updateQuantity))
        .catch(error => console.log(error))
        .finally(() => setSubmitting(false));
    }
  }

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  if (!product) return <NotFound />;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "48px" }}>
      <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <div style={{ flex: "700px", minWidth: "200px" }}>
        <Typography variant="h4" style={{ fontWeight: "bold" }}>
          {product.name}
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <Typography variant="h4" color="secondary" style={{ fontWeight: "bold" }}>
          ${(product.price / 100).toFixed(2)}
        </Typography>

        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
          mt={2}
        >
          <Box flex={1}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in stock"
              fullWidth
              value={quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= 0) setQuantity(value);
              }}
            />
          </Box>

          <Box flex={1}>
            <Button
              disabled={(item?.quantity === quantity) || (!item && quantity === 0)}
              sx={{ height: "56px" }}
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              onClick={handleUpdateCard}
            >
              {submitting ? "Processing..." : item ? "Update Quantity" : "Add To Cart"}
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
}
