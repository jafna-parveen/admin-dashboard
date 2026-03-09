import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // ================= CREATE ORDER =================
    createOrder: (state) => { state.loading = true; },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    createOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ================= GET ORDERS =================
    getInstitutionOrders: (state) => { state.loading = true; },
    getInstitutionOrdersSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getInstitutionOrdersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ================= UPDATE ORDER =================
    updateOrder: (state) => { state.loading = true; },
    updateOrderSuccess: (state, action) => {
      state.loading = false;
      const index = state.data.findIndex(o => o._id === action.payload._id);
      if (index !== -1) state.data[index] = action.payload;
    },
    updateOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Update order
    updateOrder: (state) => { state.loading = true; },
    updateOrderSuccess: (state, action) => {
      state.loading = false;
      const index = state.data.findIndex(o => o._id === action.payload._id);
      if (index !== -1) state.data[index] = action.payload;
    },
    updateOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  createOrder,
  createOrderSuccess,
  createOrderFail,
  getInstitutionOrders,
  getInstitutionOrdersSuccess,
  getInstitutionOrdersFail,
  updateOrder,
  updateOrderSuccess,
  updateOrderFail,
 
} = orderSlice.actions;

export default orderSlice.reducer;
