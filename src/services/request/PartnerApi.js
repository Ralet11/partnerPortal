// partnerApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const partnerApi = createApi({
  reducerPath: 'partnerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().partner.token; 
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Obtener productos de un partner
    getPartnerProducts: builder.query({
      query: () => '/partner/products',
    }),

    // Obtener todos los ingredientes
    getPartnerIngredients: builder.query({
      query: () => '/partner/partnerIngredient', 
      // Asegúrate de que en tu backend sea: router.get('/partnerIngredient' ...) 
      // o ajusta a '/partner/partnerIngredients' si así lo has definido.
    }),

    // Actualizar el inStock de un ingrediente
    updatePartnerIngredient: builder.mutation({
      query: ({ ingredient_id, inStock }) => ({
        url: '/partner/updateIngredient',   // <--- Ajustado
        method: 'PUT',
        body: { ingredient_id, inStock },  // <--- Todo se envía en body
      }),
    }),
  }),
});

export const {
  useGetPartnerProductsQuery,
  useGetPartnerIngredientsQuery,
  useUpdatePartnerIngredientMutation
} = partnerApi;
