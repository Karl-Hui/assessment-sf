import { configureStore } from '@reduxjs/toolkit';
import collectionsReducer from '../features/collections/collectionsSlice';

export const store = configureStore({
  reducer: {
    collections: collectionsReducer,
  },
});
