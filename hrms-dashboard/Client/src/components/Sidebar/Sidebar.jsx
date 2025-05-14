import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo">LOGO</div>
      <input type="text" placeholder="Search" className="search-input" />
      <nav className="nav-links">
        <p className="nav-title">Recruitment</p>
        <NavLink
          to="/candedate"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Candidates
        </NavLink>
        <p className="nav-title">Organization</p>
        <NavLink
          to="/employees"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Employees
        </NavLink>
        <NavLink
          to="/attendance"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Attendance
        </NavLink>
        <NavLink
          to="/leaves"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Leaves
        </NavLink>
        <p className="nav-title">Others</p>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Logout
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
