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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

import NotFound from "../../app/errors/NotFound";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSlectors } from "./catalogSlice";

export default function ProductDetails() {
  
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) => productSlectors.selectById(state, Number(id))
);

  const { status: basketStatus, basket } = useAppSelector((state) => state.basket);
  const { status: productStatus } = useAppSelector((state) => state.catalog);

  const [quantity, setQuantity] = useState(0);
  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (!product && id) dispatch(fetchProductAsync(parseInt(id)));
  }, [id, item, dispatch, product]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    }
  }

  function handleUpdateCart() {
    if (!product) return;

    if (!item || quantity > item.quantity) {
      const updateQuantity = item ? quantity - item.quantity : quantity;
      dispatch(addBasketItemAsync({ productId: product.id, quantity: updateQuantity }));
    } else {
      const updateQuantity = item.quantity - quantity;
      dispatch(removeBasketItemAsync({ productId: product.id, quantity: updateQuantity }));
    }
  }

  if (productStatus.includes("pending")) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

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
        <Typography variant="h4" fontWeight="bold">
          {product.name}
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <Typography variant="h4" color="secondary" fontWeight="bold">
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

        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2} mt={2}>
          <Box flex={1}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Box>

          <Box flex={1}>
            <LoadingButton
              loading={basketStatus.includes("pending")}
              disabled={(item?.quantity === quantity) || (!item && quantity === 0)}
              sx={{ height: "56px" }}
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              onClick={handleUpdateCart}
            >
              {item ? "Update Quantity" : "Add To Cart"}
            </LoadingButton>
          </Box>
        </Box>
      </div>
    </div>
  );
}
