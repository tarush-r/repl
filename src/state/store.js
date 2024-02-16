import { configureStore } from "@reduxjs/toolkit";
import replReducer from "./repl/replSlice";

export const store = configureStore({
  reducer: {
    repl: replReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
