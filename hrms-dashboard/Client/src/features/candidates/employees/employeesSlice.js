import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const response = await axios.get("http://hrms-repo-4wlc.vercel.app/api/candidates");
    return response.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id) => {
    await axios.delete(`http://hrms-repo-4wlc.vercel.app/api/candidates/${id}`);
    return id;
  }
);

export const editEmployee = createAsyncThunk(
  "employees/editEmployee",
  async ({ id, updatedData }) => {
    const response = await axios.put(
      `http://hrms-repo-4wlc.vercel.app/api/candidates/${id}`,
      updatedData
    );
    return response.data;
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (emp) => emp._id !== action.payload
        );
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(
          (emp) => emp._id === action.payload._id
        );
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      });
  },
});

export default employeesSlice.reducer;
