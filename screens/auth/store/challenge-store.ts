import { createSlice } from '@reduxjs/toolkit';

const challengeIDSlice = createSlice({
  name: 'challengeID',
  initialState: {
    value: '',
  },
  reducers: {
    setChallengeIDValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setChallengeIDValue } = challengeIDSlice.actions;
export default challengeIDSlice.reducer;
