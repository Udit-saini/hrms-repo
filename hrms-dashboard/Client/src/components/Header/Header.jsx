import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";
import AddCandidateModal from "./Model/AddCandidateModal";

const Header = ({ onFilterChange }) => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  const handleAddCandidate = (data) => {
    console.log("Candidate Added:", data);
  };

  return (
    <>
      <div className="header-container">
        <div className="filter-bar">
          <select
            className="dropdown"
            onChange={(e) => onFilterChange("status", e.target.value)}
          >
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Terminated">Terminated</option>
          </select>
          {location.pathname === "/candedate" && (
            <button className="add-btn" onClick={() => setShowModal(true)}>
              + Add Candidate
            </button>
          )}
        </div>

        <input type="text" className="search-bar" placeholder="Search" />
      </div>

      {showModal && (
        <AddCandidateModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddCandidate}
        />
      )}
    </>
  );
};

export default Header;
