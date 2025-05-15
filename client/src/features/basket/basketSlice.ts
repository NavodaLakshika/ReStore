import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import { agent } from "../../app/api/agent";

interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialState: BasketState = {
  basket: null,
  status: "idle",
};

// ✅ Add Item to Basket
export const addBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: number; quantity: number }
>("basket/addBasketItemAsync", async ({ productId, quantity = 1 }, thunkAPI) => {
  try {
    return await agent.Basket.addItem(productId, quantity);
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

// ✅ Remove Item from Basket (with optional name for UI status tracking)
export const removeBasketItemAsync = createAsyncThunk<
  void,
  { productId: number; quantity: number; name?: string }
>("basket/removeBasketItemAsync", async ({ productId, quantity }, thunkAPI) => {
  try {
    await agent.Basket.removeItem(productId, quantity);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue({ error: "Failed to remove item from basket" });
  }
});

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action: PayloadAction<Basket>) => {
      state.basket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId;
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.status = "idle";
    });
    builder.addCase(addBasketItemAsync.rejected, (state, action) => {
      state.status = "idle";
      console.log(action.payload);
    });

    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      const { productId, name } = action.meta.arg;
      state.status = "pendingRemoveItem" + productId + name;
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      const itemIndex = state.basket?.items.findIndex((i) => i.productId === productId);
      if (itemIndex === undefined || itemIndex < 0) return;

      state.basket!.items[itemIndex].quantity -= quantity;
      if (state.basket!.items[itemIndex].quantity <= 0) {
        state.basket!.items.splice(itemIndex, 1);
      }
      state.status = "idle";
    });
    builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
      state.status = "idle";
      console.log(action.payload);
    });
  },
});

export const { setBasket } = basketSlice.actions;
