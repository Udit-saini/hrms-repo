import { configureStore } from "@reduxjs/toolkit";
import candidateReducer from "../src/features/candidates/candidateSlice.js";
import employeesReducer from "../src/features/candidates/employees/employeesSlice.js";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    candidates: candidateReducer,
  },
});
