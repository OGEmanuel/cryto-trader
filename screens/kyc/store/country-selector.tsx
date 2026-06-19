import { createSlice } from '@reduxjs/toolkit';

const countryControlSlice = createSlice({
  name: 'country-control',
  initialState: {
    value: '',
  },
  reducers: {
    setCountryContolValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCountryContolValue } = countryControlSlice.actions;
export default countryControlSlice.reducer;
