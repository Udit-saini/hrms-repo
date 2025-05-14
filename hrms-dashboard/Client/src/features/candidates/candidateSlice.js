import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addCandidate = createAsyncThunk(
  "candidates/addCandidate",
  async (candidateData) => {
    console.log(candidateData);
    const response = await axios.post(
      "http://localhost:5000/api/candidates",
      candidateData
    );
    return response.data;
  }
);

const candidatesSlice = createSlice({
  name: "candidates",
  initialState: {
    candidates: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCandidate.fulfilled, (state, action) => {
      state.candidates.push(action.payload);
    });
  },
});

export default candidatesSlice.reducer;
