import { createSlice } from "@reduxjs/toolkit";

const subCategorySlice = createSlice({
  name: "subcategory",

  initialState: {
    list: [],
    loading: false,
    error: null
  },

  reducers: {

    /* GET ALL */
    getSubCategories: (state) => {
      state.loading = true;
    },

    getSubCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
    },

    getSubCategoriesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* CREATE */
    createSubCategory: (state) => {
      state.loading = true;
    },

   createSubCategorySuccess: (state, action) => {
  state.loading = false;

  const newItem = action.payload.data;

  const exists = state.list.some(
    (item) => item._id === newItem._id
  );

  if (!exists) {
    state.list.push(newItem);
  }
},
    createSubCategoryFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }

  }
});

export const {
  getSubCategories,
  getSubCategoriesSuccess,
  getSubCategoriesFail,
  createSubCategory,
  createSubCategorySuccess,
  createSubCategoryFail
} = subCategorySlice.actions;

export default subCategorySlice.reducer;