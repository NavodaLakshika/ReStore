import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { agent } from "../../app/api/agent";
import { User } from "../../app/models/user";
import { router } from "../../app/router/Router";
import { toast } from "react-toastify";
import { setBasket } from "../basket/basketSlice";

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
};

// ✅ Login user
export const signInUser = createAsyncThunk<User, FieldValues>(
  "account/signInUser",
  async (data, thunkAPI) => {
    try {
      const userDto = await agent.Account.login(data);
      const { basket, ...user } = userDto; // Exclude basket from user object
      if (basket) thunkAPI.dispatch(setBasket(basket)); // Set basket if exists
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data || "Login failed" });
    }
  }
);

// ✅ Fetch user on app refresh
export const fetchCurrentUser = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const userDto = await agent.Account.currentUser();
      localStorage.setItem("user", JSON.stringify(userDto));
      return userDto;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data || "Fetch failed" });
    }
  },
  {
    // ✅ Only run if user exists in localStorage
    condition: () => {
      return !!localStorage.getItem("user");
    }
  }
);

// ✅ Account Slice
export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      router.navigate("/"); // Redirect to the home page or login page
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null; // Reset user state while fetching
      localStorage.removeItem("user"); // Clear local storage if fetch fails
      toast.error("Session Expired. Please log in again.");
      router.navigate("/"); // Redirect to login page
    });
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        state.user = action.payload; // Set the user in state when fulfilled
      }
    );
    builder.addMatcher(
      isAnyOf(signInUser.rejected),
      (state, action) => {
        throw  action.payload;
      }
    );
  }
});

// ✅ Exports
export const { signOut, setUser } = accountSlice.actions;
export default accountSlice.reducer;
