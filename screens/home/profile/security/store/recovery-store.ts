import { createSlice } from '@reduxjs/toolkit';

const recoverySlice = createSlice({
  name: 'recovery',
  initialState: {
    value: [],
  },
  reducers: {
    setRecoveryValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setRecoveryValue } = recoverySlice.actions;
export default recoverySlice.reducer;
