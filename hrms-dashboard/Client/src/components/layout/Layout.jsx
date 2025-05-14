import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import Navbar from "../Navbar/Navbar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} />

      {/* Overlay only visible when sidebar is open */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      <div className="main-content">
        <Navbar onToggleSidebar={toggleSidebar} />
        <Header />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
