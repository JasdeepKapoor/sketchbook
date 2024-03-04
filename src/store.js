import { configureStore } from "@reduxjs/toolkit";
import menuReducer from './slice/menuSlice'
import toolboxSlice from "./slice/toolboxSlice";

const store= configureStore({
   reducer:{
    menu:menuReducer,
    toolbox:toolboxSlice
   }
})

export default store