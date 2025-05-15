import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1. Define the interface
export interface CounterState {
  data: number;
  title: string;
}

// 2. Initial state
const initialState: CounterState = {
  data: 42,
  title: "YARK (yet another redux counter with redux toolkit)",
};

// 3. Create slice
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.data += action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.data -= action.payload;
    },
  },
});

// 4. Export actions and reducer
export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
