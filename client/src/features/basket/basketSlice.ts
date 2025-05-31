import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import { agent } from "../../app/api/agent";
import { getCookie } from "../../app/util/util";

interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialState: BasketState = {
  // Load basket from localStorage if available
  basket: JSON.parse(localStorage.getItem('basket') || 'null'),
  status: "idle",
};

// Fetch basket if buyerId exists
export const fetchBasketAsync = createAsyncThunk<Basket>(
  'basket/fetchBasketAsync',
  async (_, thunkAPI) => {
    try {
      const basket = await agent.Basket.get();
      localStorage.setItem('basket', JSON.stringify(basket)); // Save to localStorage
      return basket;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!getCookie('buyerId')) return false;
    }
  }
);

// Add item to basket
export const addBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: number; quantity: number }
>( "basket/addBasketItemAsync",
  async ({ productId, quantity = 1 }, thunkAPI) => {
    try {
      const basket = await agent.Basket.addItem(productId, quantity);
      localStorage.setItem('basket', JSON.stringify(basket)); // Save to localStorage
      return basket;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

// Remove item from basket
export const removeBasketItemAsync = createAsyncThunk<
  void,
  { productId: number; quantity: number; name?: string }
>( "basket/removeBasketItemAsync",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      await agent.Basket.removeItem(productId, quantity);
      const updatedBasket = await agent.Basket.get(); // Get updated basket after removal
      localStorage.setItem('basket', JSON.stringify(updatedBasket)); // Save to localStorage
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action: PayloadAction<Basket>) => {
      state.basket = action.payload;
      localStorage.setItem('basket', JSON.stringify(action.payload)); // Save to localStorage
    },
    clearBasket: (state) => {
      state.basket = null;
      localStorage.removeItem('basket'); // Remove from localStorage
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBasketItemAsync.pending, (state, action) => {
        state.status = "pendingAddItem" + action.meta.arg.productId;
      })
      .addCase(removeBasketItemAsync.pending, (state, action) => {
        const { productId, name } = action.meta.arg;
        state.status = "pendingRemoveItem" + productId + name;
      })
      .addCase(removeBasketItemAsync.fulfilled, (state, action) => {
        const { productId, quantity } = action.meta.arg;
        const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);
        if (itemIndex === undefined || itemIndex < 0) return;
        state.basket!.items[itemIndex].quantity -= quantity;
        if (state.basket!.items[itemIndex].quantity <= 0) {
          state.basket!.items.splice(itemIndex, 1);
        }
        state.status = "idle";
        localStorage.setItem('basket', JSON.stringify(state.basket)); // Save updated basket to localStorage
      })
      .addCase(removeBasketItemAsync.rejected, (state) => {
        state.status = "idle";
      })
      .addMatcher(
        isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled),
        (state, action) => {
          state.basket = action.payload;
          state.status = "idle";
          localStorage.setItem('basket', JSON.stringify(action.payload)); // Save to localStorage
        }
      )
      .addMatcher(
        isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.rejected),
        (state) => {
          state.status = "idle";
        }
      );
  }
});

export const { setBasket, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
