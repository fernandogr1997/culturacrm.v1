import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  status: 'checking',
  token: '',
  getDatos: false,
}


export const credencialesSlice = createSlice({
  name: 'credenciales',
  initialState,
  reducers: {
    login: (state, {payload}) => {
      state.status = 'autenticado';
      state.token = payload;
    },
    logout:(state) => {
      Cookies.remove('token');
      Cookies.remove('user');
      
      state.status = 'no-autenticado';
      state.token = '';
    },
    actualizarDashboard: (state) => {
      if(state.getDatos === false){
        state.getDatos = true;
      }else if(state.getDatos === true){
        state.getDatos = false;
      }
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    },
    verdato: (state ,{payload}) => {
      console.log(payload);
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { checkingCredentials,login,logout,actualizarDashboard,verdato } = credencialesSlice.actions

export default credencialesSlice.reducer