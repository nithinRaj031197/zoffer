import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import dashboardReducer from "../redux/dashboardSlice";
import { baseApi } from "../api/baseApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
