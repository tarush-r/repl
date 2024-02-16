import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import parseResponse from "../../utils/utils";

const initialState = {
  history: [],
};

const replSlice = createSlice({
  name: "repl",
  initialState,
  reducers: {
    addToHistory: (state, action) => {
        state.history.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(executeOnServer.pending, (state) => {
      })
      .addCase(executeOnServer.fulfilled, (state, action) => {
        var parsedObj = parseResponse(action.payload)
        state.history.push(parsedObj);
      });
  },
});

export const executeOnServer = createAsyncThunk(
  "repl/executeOnServer",
  async (command) => {
    const response = await axios.post(
      "https://9440fe83-523b-4d06-b57b-d473bae638d0-00-2hk017eivtzt8.riker.replit.dev/eval",
      {
        code: command,
        sessionId: "aab9f3ba-7465-4319-820b-555b2e15433d",
      }
    );
    return response.data;
  }
);

export const { addToHistory } = replSlice.actions;

export default replSlice.reducer;
