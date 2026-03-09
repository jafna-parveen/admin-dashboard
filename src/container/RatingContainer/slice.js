import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  count: 0,
  loading: false,
  error: null
};

const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {

    getRating: (state) => {
      state.loading = true;
    },

    getRatingSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload.data || [];
      state.count = action.payload.count || 0;
    },

    getRatingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    

  }
});

export const {
  getRating,
  getRatingSuccess,
  getRatingFailure,
  getRatingCount,
  getRatingCountSuccess,
  getRatingCountFailure
} = ratingSlice.actions;

export default ratingSlice.reducer;