import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import loginSlice from "./modules/loginSlice";
import noteSlice from "./modules/noteSlice";

const persistConfig = {
  key: "user",
  storage,
};

const combinedReducers = combineReducers({
  login: loginSlice,
  notes: noteSlice,
});

export const persistedReducer = persistReducer(persistConfig, combinedReducers);
