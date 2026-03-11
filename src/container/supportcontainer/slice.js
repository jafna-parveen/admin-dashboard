import { createSlice } from "@reduxjs/toolkit";

const supportSlice = createSlice({

  name: "support",

  initialState: {
    requests: [],
    loading: false,
    error: null
  },

  reducers: {

    /* ================= GET REQUESTS ================= */

    getSupportRequests: (state) => {
      state.loading = true;
      state.error = null;
    },

    getSupportRequestsSuccess: (state, action) => {
      state.loading = false;
      state.requests = action.payload?.data || [];
    },

    getSupportRequestsFail: (state) => {
      state.loading = false;
      state.error = "Failed to load support requests";
    },


    /* ================= REPLY ================= */

    replySupport: (state) => {
      state.loading = true;
    },

    replySupportSuccess: (state) => {
      state.loading = false;
    },


    /* ================= DELETE ================= */

    deleteSupport: (state) => {
      state.loading = true;
    },

    deleteSupportSuccess: (state) => {
      state.loading = false;
    },


    /* ================= CREATE SUPPORT TYPE ================= */

    createSupportType: (state) => {
      state.loading = true;
    },

    createSupportTypeSuccess: (state) => {
      state.loading = false;
    },

    createSupportTypeFail: (state) => {
      state.loading = false;
      state.error = "Failed to create support type";
    }

  }

});


export const {

  getSupportRequests,
  getSupportRequestsSuccess,
  getSupportRequestsFail,

  replySupport,
  replySupportSuccess,

  deleteSupport,
  deleteSupportSuccess,

  createSupportType,
  createSupportTypeSuccess,
  createSupportTypeFail

} = supportSlice.actions;


export default supportSlice.reducer;