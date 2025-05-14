import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Employees from "./pages/Dashboard/Dashboard";
import Layout from "./components/layout/Layout";
import DashBoard from "./pages/Dashboard/Dashboard";
import Attendance from "./pages/Attendance/Attendance";
import Candidates from "./pages/Candidate/Candidates";
import Leaves from "./pages/Leaves/Leaves";

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="candedate" element={<Candidates />} />
          <Route path="employees" element={<DashBoard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leaves" element={<Leaves />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
