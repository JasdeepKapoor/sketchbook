import { configureStore } from "@reduxjs/toolkit";
import menuReducer from './slice/menuSlice'
import toolboxSlice from './slice/toolSlice';

const store= configureStore({
   reducer:{
    menu:menuReducer,
    toolbox:toolboxSlice
   }
})

export default store