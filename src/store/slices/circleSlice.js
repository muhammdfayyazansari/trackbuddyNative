import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  circles: []
}




const circleSlice = createSlice({
  name : "circles",
  initialState, 
  reducers: {
    setCircles(state, action){
      state.circles = action.payload;
    }
  }
})


export const {setCircles} = circleSlice.actions;
export default circleSlice.reducer; 
