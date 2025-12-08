// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './features/auth/authApi';
import authReducer from './features/auth/authSlice';
import { issueApi } from './features/issue/issuApi';
import statsApi from './features/stats/statsApi';
import { reviewApi } from './features/reviews/reviewApi';
import { emergencyApi } from './features/emergency/emergencyApi';
import notificationReducer from './features/emergency/notificationSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [issueApi.reducerPath]: issueApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [emergencyApi.reducerPath]: emergencyApi.reducer,
    notification: notificationReducer,
    [statsApi.reducerPath]: statsApi.reducer
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, issueApi.middleware, reviewApi.middleware, emergencyApi.middleware, statsApi.middleware),
});

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']