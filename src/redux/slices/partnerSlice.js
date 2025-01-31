import { createSlice } from '@reduxjs/toolkit';


function isToday(dateString) {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

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
  orders: [], 
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
      state.orders = []; n
    },

    
    updatePartnerData: (state, action) => {
      const { name, email, phone, address } = action.payload;
      if (name !== undefined) state.name = name;
      if (email !== undefined) state.email = email;
      if (phone !== undefined) state.phone = phone;
      if (address !== undefined) state.address = address;
    },

   
    setOrders: (state, action) => {
      const allOrders = action.payload || [];
      const closedStatuses = ['cancelada', 'finalizada', 'rechazada'];

      const filteredOrders = allOrders.filter(order => {
        const isActive = !closedStatuses.includes(order.status.toLowerCase());
        const isClosedToday =
          closedStatuses.includes(order.status.toLowerCase()) && isToday(order.updatedAt);
        return isActive || isClosedToday;
      });

      state.orders = filteredOrders;
    },

   
    setAllOrders: (state, action) => {
      state.orders = action.payload;
    },

    
    updateOrder: (state, action) => {
      const updatedOrder = action.payload;
      const index = state.orders.findIndex(order => order.id === updatedOrder.id);

      if (index !== -1) {
        state.orders[index] = updatedOrder;
      } else {
        
        const closedStatuses = ['cancelada', 'finalizada', 'rechazada'];
        const isActive = !closedStatuses.includes(updatedOrder.status.toLowerCase());
        const isClosedToday = closedStatuses.includes(updatedOrder.status.toLowerCase()) && isToday(updatedOrder.updatedAt);

        if (isActive || isClosedToday) {
          state.orders.push(updatedOrder);
        }
      }
    },

   
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(order => order.id !== action.payload);
    },
  },
});


export const {
  setPartnerData,
  logoutPartner,
  updatePartnerData,
  setOrders,
  setAllOrders,
  updateOrder,
  removeOrder,
} = partnerSlice.actions;


export default partnerSlice.reducer;
