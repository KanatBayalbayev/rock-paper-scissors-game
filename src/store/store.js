import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./gameSlice";

const store = configureStore({
  reducer: gameSlice,
});

export default store;
