
import { createSlice } from '@reduxjs/toolkit';
import { MENU_ITEMS } from '@/constants';

const initialState = {

 activeMenuItem:MENU_ITEMS.PENCIL,
 activeActionItem:null,
 showColorPalette:true
};

// Create a slice
const menuSlice = createSlice({
  name: 'menuSlice', 
  initialState, 
  reducers: {
    // Reducers go here
   menuItemClick: (state,action)=>{
      state.activeMenuItem=action.payload
      if(action.payload == MENU_ITEMS.ERASER) {
        if(state.showColorPalette){
          state.showColorPalette=false
        }
      }
      else{
        if(!state.showColorPalette) {
          state.showColorPalette= true
        }
      }
    },
    actionItemClick:(state,action)=>{
      state.activeActionItem= action.payload
    }
  },
});

// Export the actions
export const {menuItemClick, actionItemClick} = menuSlice.actions;

// Export the reducer
export default menuSlice.reducer;
