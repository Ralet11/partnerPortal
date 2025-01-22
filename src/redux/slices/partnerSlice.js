import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: '',
  email: '',
  latitude: null,
  longitude: null,
  token: null,
  isLoggedIn: false,
};

export const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    setPartnerData: (state, action) => {
      // Extraemos los datos del payload
      const { id, name, email, latitude, longitude, token } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.latitude = latitude;
      state.longitude = longitude;
      state.token = token;
      state.isLoggedIn = true;
    },
    logoutPartner: (state) => {
      // Reseteamos todos los campos
      state.id = null;
      state.name = '';
      state.email = '';
      state.latitude = null;
      state.longitude = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setPartnerData, logoutPartner } = partnerSlice.actions;
export default partnerSlice.reducer;
