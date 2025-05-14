import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployees,
  editEmployee,
  deleteEmployee,
} from "../../../src/features/candidates/employees/employeesSlice";
import "./candidates.css";

const Candidates = () => {
  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector((state) => state.employees);
  const [activeMenu, setActiveMenu] = useState(null);
  const [editingStatusRow, setEditingStatusRow] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleStatusChange = (emp, newStatus) => {
    dispatch(editEmployee({ id: emp._id, updatedData: { status: newStatus } }));
    setEditingStatusRow(null);
    setActiveMenu(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
    setActiveMenu(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Candidate Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Position</th>
            <th>Status</th>
            <th>Experience</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp._id}>
              <td>{index + 1}</td>
              <td>{emp.fullName}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.position}</td>
              <td>
                {editingStatusRow === index ? (
                  <select
                    className="dropdown"
                    value={emp.status}
                    onChange={(e) => handleStatusChange(emp, e.target.value)}
                  >
                    <option value="New">New</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Ongoing">Ongoing</option>
                  </select>
                ) : (
                  emp.status
                )}
              </td>
              <td>{emp.experience}</td>
              <td style={{ position: "relative" }}>
                <span
                  className="action-dots"
                  onClick={() =>
                    setActiveMenu(activeMenu === index ? null : index)
                  }
                >
                  ⋮
                </span>
                {activeMenu === index && (
                  <div className="dropdown-menu">
                    <button onClick={() => setEditingStatusRow(index)}>
                      Edit Status
                    </button>
                    <button onClick={() => handleDelete(emp._id)}>
                      Delete
                    </button>
                    <button onClick={() => setActiveMenu(null)}>Cancel</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Candidates;
