import { createSlice } from '@reduxjs/toolkit';

const pageControlSlice = createSlice({
  name: 'page-control',
  initialState: {
    value: 0,
  },
  reducers: {
    setPageContolValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPageContolValue } = pageControlSlice.actions;
export default pageControlSlice.reducer;
