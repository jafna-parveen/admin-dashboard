import { combineReducers } from "redux";

import loginReducer from "container/LoginContainer/slice";
import customizationReducer from "./customizationReducer";
import subCategoryReducer from "container/subcategorycontainer/slice";
import institutionReducer from "container/institutecontainer/slice";
import categoryReducer from "container/categorycontainer/slice";

const reducer = combineReducers({

  login: loginReducer,
  customization: customizationReducer,
   subcategory: subCategoryReducer,
  institution: institutionReducer,   // ✅ changed
  category: categoryReducer

});

export default reducer;