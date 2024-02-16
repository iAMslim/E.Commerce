import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api/api";

// Define initial state
const initialState = {
  orders: [],
  isLoading: false,
  error: null,
};

// Create a slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // Reducer for setting loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    // Reducer for handling successful order fetch
    fetchOrdersSuccess: (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    // Reducer for handling order fetch failure
    fetchOrdersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Export actions
export const { setLoading, fetchOrdersSuccess, fetchOrdersFailure } = orderSlice.actions;

// Export async thunk to fetch orders
export const fetchOrders = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.endpoints.getAllOrders();
    dispatch(fetchOrdersSuccess(response));
  } catch (error) {
    dispatch(fetchOrdersFailure(error.message));
  }
};

// Export reducer
export default orderSlice.reducer;
