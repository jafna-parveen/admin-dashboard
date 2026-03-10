import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({

  name: "category",

  initialState: {
    categories: [],
    loading: false,
    error: null
  },

  reducers: {

    /* ===== GET CATEGORIES ===== */

    getCategories: (state) => {
      state.loading = true;
    },

    getCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload.data;
    },

    getCategoriesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    /* ===== CREATE CATEGORY ===== */

    createCategory: (state) => {
      state.loading = true;
    },

    createCategorySuccess: (state) => {
      state.loading = false;
    },

    createCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    /* ===== UPDATE CATEGORY ===== */

    updateCategory: (state) => {
      state.loading = true;
    },

    updateCategorySuccess: (state) => {
      state.loading = false;
    },

    updateCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    /* ===== DELETE CATEGORY ===== */

    deleteCategory: (state) => {
      state.loading = true;
    },

    deleteCategorySuccess: (state) => {
      state.loading = false;
    },

    deleteCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    /* ===== TOGGLE STATUS ===== */

    toggleStatus: (state) => {
      state.loading = true;
    },

    toggleStatusSuccess: (state) => {
      state.loading = false;
    },

    toggleStatusFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }

  }

});

export const {

  getCategories,
  getCategoriesSuccess,
  getCategoriesFail,

  createCategory,
  createCategorySuccess,
  createCategoryFail,

  updateCategory,
  updateCategorySuccess,
  updateCategoryFail,

  deleteCategory,
  deleteCategorySuccess,
  deleteCategoryFail,

  toggleStatus,
  toggleStatusSuccess,
  toggleStatusFail

} = categorySlice.actions;

export default categorySlice.reducer;