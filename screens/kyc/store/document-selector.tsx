import { createSlice } from '@reduxjs/toolkit';

const documentControlSlice = createSlice({
  name: 'document-control',
  initialState: {
    value: '' as 'national_id' | 'passport' | 'drivers_license',
  },
  reducers: {
    setDocumentContolValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDocumentContolValue } = documentControlSlice.actions;
export default documentControlSlice.reducer;
