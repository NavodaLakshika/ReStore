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
import { Remove, Add, Delete } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";

export default function BasketPage() {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  if (!basket || basket.items.length === 0) {
    return (
      <Typography variant="h4" color="secondary" fontWeight="bold" mt={4}>
        Your basket is empty
      </Typography>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table>
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
                      onError={(e) =>
                        (e.currentTarget.src = "/images/placeholder.png")
                      }
                      style={{ width: 50, height: 50, marginRight: 16 }}
                    />
                    <Typography>{item.name}</Typography>
                  </Box>
                </TableCell>

                <TableCell align="right">
                  ${(item.price / 100).toFixed(2)}
                </TableCell>

                <TableCell align="center">
                  <Button
                    loading={status === "pendingRemoveItem" + item.productId + "decrement"}
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                          name: 'decrement'
                          
                        })
                      )
                    }
                    color="error"
                    sx={{ minWidth: 32 }}
                    title="Remove one"
                  >
                    <Remove />
                  </Button>

                  <Typography display="inline" mx={2}>
                    {item.quantity}
                  </Typography>

                  <Button
                    loading={status === "pendingAddItem" + item.productId }
                    onClick={() =>
                      dispatch(
                        addBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                         
                        })
                      )
                    }
                    color="secondary"
                    sx={{ minWidth: 32 }}
                    title="Add one"
                  >
                    <Add />
                  </Button>
                </TableCell>

                <TableCell align="right">
                  ${(item.price / 100* item.quantity).toFixed(2)}
                </TableCell>

                <TableCell align="right">
                  <Button
                    loading={status === "pendingRemoveItem" + item.productId + "delete"}
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: 'delete'
                          
                        })
                      )
                    }
                    color="error"
                    title="Remove all"
                  >
                    <Delete />
                  </Button>
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
