import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import messageReducer from './messagesSlice';
import activeuserReducer from './activeUserSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    messages: messageReducer,
    activeusers: activeuserReducer
  }
});

export default store;
