import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: []
};

export const messagesSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    message: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value.push(action.payload);
    }
  }
});

export const { message } = messagesSlice.actions;

export default messagesSlice.reducer;
