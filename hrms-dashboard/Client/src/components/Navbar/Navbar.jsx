import React from "react";
import "./Navbar.css";

const Navbar = ({ onToggleSidebar }) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <button className="sidebar-toggle" onClick={onToggleSidebar}>
          ☰
        </button>

        <h2 className="navbar-title">Dashboard</h2>
      </div>
      <div className="navbar-right">
        <p>Welcome, User</p>
      </div>
    </div>
  );
};

export default Navbar;
