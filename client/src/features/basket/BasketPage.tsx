import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Delete, Add, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/api/context/StoreContext";
import { agent } from "../../app/api/agent";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";

export default function BasketPage() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [status, setStatus] = useState({ loading: false, name: "" });

  const handleAddItem = (productId: number) => {
    setStatus({ loading: true, name: "add" + productId });
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.error(error))
      .finally(() => setStatus({ loading: false, name: "" }));
  };

  const handleRemoveItem = (productId: number, quantity = 1) => {
    setStatus({ loading: true, name: "remove" + productId + quantity });
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.error(error))
      .finally(() => setStatus({ loading: false, name: "" }));
  };

  if (!basket || basket.items.length === 0) {
    return (
      <Typography variant="h4" color="secondary" fontWeight="bold" mt={4}>
        Your basket is empty
      </Typography>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow key={item.productId}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ width: 50, height: 50, marginRight: 16 }}
                    />
                    <Typography>{item.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={status.loading && status.name === "remove" + item.productId + "1"}
                    onClick={() => handleRemoveItem(item.productId)}
                    color="error"
                    sx={{ minWidth: 32 }}
                  >
                    <Remove />
                  </LoadingButton>
                  <Typography display="inline" mx={2}>
                    {item.quantity}
                  </Typography>
                  <LoadingButton
                    loading={status.loading && status.name === "add" + item.productId}
                    onClick={() => handleAddItem(item.productId)}
                    color="secondary"
                    sx={{ minWidth: 32 }}
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  ${(item.price / 100 * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={status.loading && status.name === "remove" + item.productId + item.quantity}
                    onClick={() => handleRemoveItem(item.productId, item.quantity)}
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
        <Box sx={{ width: { xs: "100%", sm: "70%", md: "40%" } }}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
            disabled={!basket.items.length}
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </>
  );
}
