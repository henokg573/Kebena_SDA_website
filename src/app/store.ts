// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { sabbathSchoolApi } from '../api/sabbathSchool';

export const store = configureStore({
  reducer: {
    [sabbathSchoolApi.reducerPath]: sabbathSchoolApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sabbathSchoolApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;