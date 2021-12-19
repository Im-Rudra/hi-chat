import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {}
};

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    login: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    }
  }
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
