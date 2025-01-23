// src/redux/slices/partnerSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: '',
  email: '',
  phone: '',
  address: '',
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
      state.id = null;
      state.name = '';
      state.email = '';
      state.phone = '';
      state.address = '';
      state.latitude = null;
      state.longitude = null;
      state.token = null;
      state.isLoggedIn = false;
    },
    // Nueva acción para actualizar datos del partner
    updatePartnerData: (state, action) => {
      const { name, email, phone, address } = action.payload;
      if (name !== undefined) state.name = name;
      if (email !== undefined) state.email = email;
      if (phone !== undefined) state.phone = phone;
      if (address !== undefined) state.address = address;
    },
  },
});

export const { setPartnerData, logoutPartner, updatePartnerData } = partnerSlice.actions;
export default partnerSlice.reducer;
