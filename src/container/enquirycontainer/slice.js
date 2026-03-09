import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  count: 0,
  loading: false,
  error: null
};

const enquirySlice = createSlice({
  name: "enquiry",
  initialState,
  reducers: {

    /* ================= GET ENQUIRIES ================= */

    getInstituteEnquiry: (state) => {
      state.loading = true;
      state.error = null;
    },

    getCourseEnquiry: (state) => {
      state.loading = true;
      state.error = null;
    },

    getEnquirySuccess: (state, action) => {
      state.loading = false;

      if (Array.isArray(action.payload)) {
        state.list = action.payload;
        state.count = action.payload.length;
      } 
      else if (Array.isArray(action.payload?.data)) {
        state.list = action.payload.data;
        state.count = action.payload.count || action.payload.data.length;
      } 
      else {
        state.list = [];
        state.count = 0;
      }
    },

    getEnquiryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ================= UPDATE STATUS ================= */

    updateEnquiry: (state) => {
      state.loading = true;
      state.error = null;
    },

    updateEnquirySuccess: (state, action) => {
      state.loading = false;

      const updated = action.payload?.data || action.payload;

      const index = state.list.findIndex(
        (item) => item._id === updated._id
      );

      if (index !== -1) {
        state.list[index] = updated;
      }
    },

    updateEnquiryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ================= DELETE ENQUIRY ================= */

    deleteEnquiry: (state) => {
      state.loading = true;
      state.error = null;
    },

    deleteEnquirySuccess: (state, action) => {
      state.loading = false;

      const id = action.payload;

      state.list = state.list.filter(
        (item) => item._id !== id
      );

      state.count = state.list.length;
    },

    deleteEnquiryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }

  }
});

export const {
  getInstituteEnquiry,
  getCourseEnquiry,
  getEnquirySuccess,
  getEnquiryFailure,
  updateEnquiry,
  updateEnquirySuccess,
  updateEnquiryFailure,

  deleteEnquiry,
  deleteEnquirySuccess,
  deleteEnquiryFailure

} = enquirySlice.actions;

export default enquirySlice.reducer;