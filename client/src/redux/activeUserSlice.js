import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: []
};

export const activeUserSlice = createSlice({
  name: 'activeUsers',
  initialState,
  reducers: {
    addActiveUser: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    }
  }
});

export const { addActiveUser } = activeUserSlice.actions;

export default activeUserSlice.reducer;
