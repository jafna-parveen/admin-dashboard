import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    courses: [],
    categories: [],
    subcategories: [],
    loading: false,
    error: null
  },
  reducers: {
    /* ===== COURSES ===== */
    addCourse: state => { state.loading = true; state.error = null; },
    addCourseSuccess: (state, action) => { state.loading = false; state.courses.push(action.payload); },
    addCourseFail: (state, action) => { state.loading = false; state.error = action.payload; },

    getCourses: state => { state.loading = true; state.error = null; },
    getCoursesSuccess: (state, action) => { state.loading = false; state.courses = action.payload; },
    getCoursesFail: (state, action) => { state.loading = false; state.error = action.payload; },

    updateCourse: state => { state.loading = true; state.error = null; },
    updateCourseSuccess: (state, action) => {
      state.loading = false;
      const index = state.courses.findIndex(c => c._id === action.payload._id);
      if (index !== -1) state.courses[index] = action.payload;
    },
    updateCourseFail: (state, action) => { state.loading = false; state.error = action.payload; },

    deleteCourse: state => { state.loading = true; state.error = null; },
    deleteCourseSuccess: (state, action) => { state.loading = false; state.courses = state.courses.filter(c => c._id !== action.payload); },
    deleteCourseFail: (state, action) => { state.loading = false; state.error = action.payload; },

    /* ===== CATEGORIES ===== */
    getCategories: state => { state.loading = true; state.error = null; },
    getCategoriesSuccess: (state, action) => { state.loading = false; state.categories = action.payload; },
    getCategoriesFail: (state, action) => { state.loading = false; state.error = action.payload; },

    /* ===== SUBCATEGORIES ===== */
    getSubCategories: state => { state.loading = true; state.error = null; },
    getSubCategoriesSuccess: (state, action) => { state.loading = false; state.subcategories = action.payload; },
    getSubCategoriesFail: (state, action) => { state.loading = false; state.error = action.payload; }
  }
});

export const {
  /* COURSES */
  addCourse, addCourseSuccess, addCourseFail,
  getCourses, getCoursesSuccess, getCoursesFail,
  updateCourse, updateCourseSuccess, updateCourseFail,
  deleteCourse, deleteCourseSuccess, deleteCourseFail,

  /* CATEGORIES */
  getCategories, getCategoriesSuccess, getCategoriesFail,

  /* SUBCATEGORIES */
  getSubCategories, getSubCategoriesSuccess, getSubCategoriesFail
} = courseSlice.actions;

export default courseSlice.reducer;