
import { createSlice } from '@reduxjs/toolkit';
import { MENU_ITEMS } from '@/constants';

const initialState = {

[MENU_ITEMS.PENCIL]:{
    color:'black',
    size:3
},
[MENU_ITEMS.ERASER]:{
    color:'white',
    size:3
},
[MENU_ITEMS.UNDO]:{},
[MENU_ITEMS.REDO]:{},
[MENU_ITEMS.DOWNLOAD]:{},
};

// Create a slice
const toolboxSlice = createSlice({
  name: 'toolboxSlice', 
  initialState, 
  reducers: {
    // Reducers go here
    changeColor:(state,action)=>{
        state[action.payload.item].color= action.payload.color
    },
    changeSize:(state,action)=>{
        state[action.payload.item].size= action.payload.size
    }
  },
});

// Export the actions
export const {changeColor, changeSize} = toolboxSlice.actions;

// Export the reducer
export default toolboxSlice.reducer;
