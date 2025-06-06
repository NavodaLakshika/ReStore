// Action types
export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";

// State interface
export interface CounterState {
  data: number;
  title: string;
}

// Initial state
const initialState: CounterState = {
  data: 42,
  title: "YARK (yet another redux counter)",
};

// Action creators
export function increment(amount = 1) {
  return {
    type: INCREMENT_COUNTER,
    payload: amount,
  };
}

export function decrement(amount = 1) {
  return {
    type: DECREMENT_COUNTER,
    payload: amount,
  };
}

// Reducer function
export default function counterReducer(
  state = initialState,
  action: { type: string; payload: number }
): CounterState {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        data: state.data + action.payload,
      };
    case DECREMENT_COUNTER:
      return {
        ...state,
        data: state.data - action.payload,
      };
    default:
      return state;
  }
}
