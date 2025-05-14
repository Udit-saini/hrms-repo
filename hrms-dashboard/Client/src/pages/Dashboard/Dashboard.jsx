import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployees,
  deleteEmployee,
  editEmployee,
} from "../../../src/features/candidates/employees/employeesSlice";
import "./dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector((state) => state.employees);
  const [activeRow, setActiveRow] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const selectedEmployees = employees.filter(
    (emp) => emp.status === "Selected"
  );

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
    if (activeRow !== null) setActiveRow(null);
  };

  const handleEdit = (id) => {
    if (!editedEmployee) return;

    dispatch(editEmployee({ id, updatedData: editedEmployee }));
    setActiveRow(null);
  };

  const toggleDropdown = (index, emp) => {
    if (activeRow === index) {
      setActiveRow(null);
      setEditedEmployee(null);
    } else {
      setActiveRow(index);
      setEditedEmployee({ ...emp });
    }
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setEditedEmployee((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) return <div>Loading employees...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Full Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Position</th>
            <th>Experience</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {selectedEmployees.map((emp, index) => (
            <tr key={emp._id || index}>
              <td>{index + 1}</td>
              <td>
                {activeRow === index ? (
                  <input
                    type="text"
                    value={editedEmployee?.fullName || ""}
                    onChange={(e) => handleInputChange(e, "fullName")}
                  />
                ) : (
                  emp.fullName
                )}
              </td>
              <td>
                {activeRow === index ? (
                  <input
                    type="email"
                    value={editedEmployee?.email || ""}
                    onChange={(e) => handleInputChange(e, "email")}
                  />
                ) : (
                  emp.email
                )}
              </td>
              <td>
                {activeRow === index ? (
                  <input
                    type="text"
                    value={editedEmployee?.phone || ""}
                    onChange={(e) => handleInputChange(e, "phone")}
                  />
                ) : (
                  emp.phone
                )}
              </td>
              <td>
                {activeRow === index ? (
                  <input
                    type="text"
                    value={editedEmployee?.position || ""}
                    onChange={(e) => handleInputChange(e, "position")}
                  />
                ) : (
                  emp.position
                )}
              </td>
              <td>
                {activeRow === index ? (
                  <input
                    type="text"
                    value={editedEmployee?.experience || ""}
                    onChange={(e) => handleInputChange(e, "experience")}
                  />
                ) : (
                  emp.experience
                )}
              </td>
              <td>
                <span
                  className="action-dots"
                  onClick={() => toggleDropdown(index, emp)}
                >
                  ⋮
                </span>
                {activeRow === index && (
                  <div className="dropdown-menu">
                    <button onClick={() => handleEdit(emp._id)}>Save</button>
                    <button onClick={() => setActiveRow(null)}>Cancel</button>
                    <button onClick={() => handleDelete(emp._id)}>
                      Delete
                    </button>
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

export default Dashboard;
