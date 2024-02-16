import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import parseResponse from "../../utils/utils";
import Data from "../../models/Data";
// import Data from "../../classes/Data";

const initialState = {
  history: [],
};

const replSlice = createSlice({
  name: "repl",
  initialState,
  reducers: {
    addToHistory: (state, action) => {
      //     console.log('printing inside redux ', action.payload)
        state.history.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(executeOnServer.pending, (state) => {
        console.log("fetching API");
      })
      .addCase(executeOnServer.fulfilled, (state, action) => {
        
        console.log("API FULLFILLED: ", action.payload);
        var parsedObj = parseResponse(action.payload)
        // let dataObj = new Data(1, parsedObj)
        console.log("pushing in state: ", parsedObj)
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
