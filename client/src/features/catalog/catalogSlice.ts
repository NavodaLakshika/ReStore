import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import { agent } from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { AxiosError } from "axios";

// ✅ Fix typo: "produtsAdapter" → "productsAdapter"
const productsAdapter = createEntityAdapter<Product>();

// ✅ Fetch all products
export const fetchProductsAsync = createAsyncThunk<Product[], void, { rejectValue: { error: any } }>(
  'catalog/fetchProductsAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Catalog.list();
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue({ error: axiosError.response?.data });
    }
  }
);

// ✅ Fetch single product (fixed action type string!)
export const fetchProductAsync = createAsyncThunk<Product, number, { rejectValue: { error: any } }>(
  'catalog/fetchProductAsync',
  async (productId, thunkAPI) => {
    try {
      return await agent.Catalog.details(productId);
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue({ error: axiosError.response?.data });
    }
  }
);

// Slice definition
export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState({
    productsLoaded: false,
    status: "idle",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = "pendingFetchProducts";
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        productsAdapter.setAll(state, action.payload);
        state.status = "idle";
        state.productsLoaded = true;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      })
      .addCase(fetchProductAsync.pending, (state) => {
        state.status = "pendingFetchProduct";
      })
      .addCase(fetchProductAsync.fulfilled, (state, action) => {
        productsAdapter.upsertOne(state, action.payload);
        state.status = "idle";
      })
      .addCase(fetchProductAsync.rejected, (state,action) => {
        console.log(action);
        state.status = "idle";
      });
  },
});

// ✅ Export selectors
export const productSlectors = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);

export default catalogSlice.reducer;
