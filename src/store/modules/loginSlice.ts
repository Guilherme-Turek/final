import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, userLogin, UserLoginType } from "../../services/api.service";

export const loginAction = createAsyncThunk(
  "users/login",
  async (login: UserLoginType) => {
    const result = await userLogin(login);
    return result;
  }
);

const loginSlice = createSlice({
  name: "user",
  initialState: {} as User,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAction.fulfilled, (state, action) => {
      const result = action.payload;
      if (result.ok) {
        return result.data;
      }
    });
  },
});

export default loginSlice.reducer;
