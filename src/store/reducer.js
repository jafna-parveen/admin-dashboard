import { combineReducers } from "redux";

import loginReducer from "container/LoginContainer/slice";
import customizationReducer from "./customizationReducer";
import ratingReducer from "container/RatingContainer/slice";
import coursReducer from "container/coursecontainer/slice";
import orderReducer from "container/ordercontainer/slice";
import enquiryReducer from 'container/enquirycontainer/slice';

const reducer = combineReducers({

 login: loginReducer,
 customization: customizationReducer,
 rating: ratingReducer,
 course: coursReducer,
 order: orderReducer,
 enquiry: enquiryReducer


});

export default reducer;