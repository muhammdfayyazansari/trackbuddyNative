import userSlice from "./slices/userSlice";
import circleSlice from "./slices/circleSlice";
import { combineReducers } from "@reduxjs/toolkit";



const rootReducer = combineReducers({
  userSlice: userSlice,
  circleSlice: circleSlice,
})



export default rootReducer;