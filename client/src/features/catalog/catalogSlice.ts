import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../app/models/product";
import { agent } from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { AxiosError } from "axios";
import { MetaData } from "../../app/models/pagination";

interface CatalogState {
  status: 'idle' | 'pendingFetchProducts' | 'pendingFetchProduct' | 'pendingFetchFilters';
  productsLoaded: boolean;
  filtersLoaded: boolean;
  brands: string[];
  types: string[];
  productParams: ProductParams;
  metaData:MetaData | null;
}

interface ThunkError {
  error: any;
}

const productsAdapter = createEntityAdapter<Product>();

function getAxiosParams(productParams: ProductParams): URLSearchParams {
  const params = new URLSearchParams();
  params.append('pageNumber', productParams.pageNumber.toString());
  params.append('pageSize', productParams.pageSize.toString());
  params.append('orderBy', productParams.orderBy);

  if (productParams.searchTerm) params.append('searchTerm', productParams.searchTerm);
  if (productParams.brands.length > 0) params.append('brands', productParams.brands.join(','));
  if (productParams.types.length > 0) params.append('types', productParams.types.join(','));

  return params;
}

function initParams(): ProductParams {
  return {
    pageNumber: 1,
    pageSize: 8,
    orderBy: 'name',
    brands: [],
    types: []
  };
}

export const fetchProductsAsync = createAsyncThunk<
  Product[],
  void,
  { state: RootState; rejectValue: ThunkError }
>(
  'catalog/fetchProductsAsync',
  async (_, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
    try {
      const response = await agent.Catalog.list(params);
      thunkAPI.dispatch(setMetaData(response.metaData));
      return response.items; // Assuming response has { items, metaData }
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue({ error: axiosError.response?.data });
    }
  }
);

export const fetchProductAsync = createAsyncThunk<
  Product,
  number,
  { rejectValue: ThunkError }
>(
  'catalog/fetchProductAsync',
  async (productId, thunkAPI) => {
    try {
      const response = await agent.Catalog.details(productId);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue({ error: axiosError.response?.data });
    }
  }
);

export const fetchFilters = createAsyncThunk<
  { brands: string[]; types: string[] },
  void,
  { rejectValue: ThunkError }
>(
  'catalog/fetchFilters',
  async (_, thunkAPI) => {
    try {
      return await agent.Catalog.fetchFilters();
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue({ error: axiosError.response?.data });
    }
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState<CatalogState>({
    productsLoaded: false,
    status: "idle",
    filtersLoaded: false,
    brands: [],
    types: [],
    productParams: initParams(),
    metaData: null
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false;
      state.productParams = {
        ...state.productParams,
        ...action.payload,
        pageNumber: 1
      
      };
    },

     setPageNumber: (state, action) => {
      state.productsLoaded = false;
      state.productParams = {
        ...state.productParams,
        ...action.payload,
        
      };
    },

    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetProductParams: (state) => {
      state.productParams = initParams();
    },
   
  },
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
        console.error('Failed to fetch products:', action.payload?.error);
        state.status = "idle";
      })
      .addCase(fetchProductAsync.pending, (state) => {
        state.status = "pendingFetchProduct";
      })
      .addCase(fetchProductAsync.fulfilled, (state, action) => {
        productsAdapter.upsertOne(state, action.payload);
        state.status = "idle";
      })
      .addCase(fetchProductAsync.rejected, (state, action) => {
        console.error('Failed to fetch product:', action.payload?.error);
        state.status = "idle";
      })
      .addCase(fetchFilters.pending, (state) => {
        state.status = "pendingFetchFilters";
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.brands = action.payload.brands;
        state.types = action.payload.types;
        state.filtersLoaded = true;
        state.status = "idle";
      })
      .addCase(fetchFilters.rejected, (state, action) => {
        console.error('Failed to fetch filters:', action.payload?.error);
        state.status = "idle";
      });
  },
});

export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);

export const {
  setProductParams,
  resetProductParams,
  setMetaData,
  setPageNumber
} = catalogSlice.actions;

export default catalogSlice.reducer;
