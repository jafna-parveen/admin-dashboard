import { combineReducers } from "redux";

import loginReducer from "container/LoginContainer/slice";
import customizationReducer from "./customizationReducer";
import subCategoryReducer from "container/subcategorycontainer/slice";
import institutionReducer from "container/institutecontainer/slice";
import categoryReducer from "container/categorycontainer/slice";
import supportReducer from "container/supportcontainer/slice";

const reducer = combineReducers({
  login: loginReducer,
  customization: customizationReducer,

  /* CATEGORY MODULES */
  category: categoryReducer,
  subcategory: subCategoryReducer,

  /* INSTITUTION MODULE */
  institution: institutionReducer,

  /* SUPPORT MODULE */
  support: supportReducer
});

export default reducer;