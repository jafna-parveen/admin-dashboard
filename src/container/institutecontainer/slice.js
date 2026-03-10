import { createSlice } from "@reduxjs/toolkit";

const institutionSlice = createSlice({
  name: "institution",
  initialState: {
    profile: null,
    list: [], // ✅ ADDED
    loading: false,
    error: null
  },

  reducers: {

    /* ===== GET ALL INSTITUTIONS ===== */

    getInstitutions: (state) => {
      state.loading = true;
    },

    getInstitutionsSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload; // ✅ STORE LIST
    },

    getInstitutionsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ===== GET PROFILE ===== */
    getInstitution: (state) => {
      state.loading = true;
      state.error = null;
    },

    getInstitutionSuccess: (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    },

    getInstitutionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ===== UPDATE PROFILE ===== */
    updateInstitution: (state) => {
      state.loading = true;
      state.error = null;
    },

    updateInstitutionSuccess: (state, action) => {
      state.loading = false;
      state.profile = action.payload.data;
    },

    updateInstitutionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }

  }
});

export const {
  getInstitutions,
  getInstitutionsSuccess,
  getInstitutionsFail,
  getInstitution,
  getInstitutionSuccess,
  getInstitutionFail,
  updateInstitution,
  updateInstitutionSuccess,
  updateInstitutionFail
} = institutionSlice.actions;

export default institutionSlice.reducer;