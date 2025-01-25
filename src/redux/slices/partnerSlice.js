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
  orders: [], // Nuevo elemento para almacenar las órdenes del partner
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
      state.orders = []; // Limpia las órdenes al cerrar sesión
    },
    updatePartnerData: (state, action) => {
      const { name, email, phone, address } = action.payload;
      if (name !== undefined) state.name = name;
      if (email !== undefined) state.email = email;
      if (phone !== undefined) state.phone = phone;
      if (address !== undefined) state.address = address;
    },

    // Nueva acción para sobrescribir todas las órdenes del partner
    setOrders: (state, action) => {
      state.orders = action.payload;
    },

    // --- NUEVA ACCIÓN updateOrder ---
    updateOrder: (state, action) => {
      const updatedOrder = action.payload;

      // Buscamos la posición de la orden que coincida en ID
      const index = state.orders.findIndex((o) => o.id === updatedOrder.id);
      if (index !== -1) {
        // Reemplazamos esa orden con la nueva
        state.orders[index] = updatedOrder;
      }
    },
  },
});

export const {
  setPartnerData,
  logoutPartner,
  updatePartnerData,
  setOrders,
  updateOrder, // ← Exportamos la nueva acción
} = partnerSlice.actions;

export default partnerSlice.reducer;
