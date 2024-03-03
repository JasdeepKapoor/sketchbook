import { configureStore } from "@reduxjs/toolkit";
import menuReducer from './slice/toolBoxSlice'

const store= configureStore({
   reducer:{
    menu:menuReducer
   }
})

export default store