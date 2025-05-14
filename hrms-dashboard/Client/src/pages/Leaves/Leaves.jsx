import React, { useState } from "react";
import "./Leaves.css";
import { useSelector } from "react-redux";

const Leaves = () => {
  const { employees } = useSelector((state) => state.employees);

  const [leaves, setLeaves] = useState([
    {
      id: 1,
      employeeId: "1",
      name: "Cody Fisher",
      date: "2024-09-08",
      reason: "Visiting House",
      status: "Approved",
      position: "Senior Backend Developer",
      avatar: "",
    },
  ]);

  const [form, setForm] = useState({
    employeeId: "",
    date: "",
    reason: "",
    status: "Pending",
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddLeave = (e) => {
    e.preventDefault();
    const selectedEmp = employees.find((emp) => emp.id === form.employeeId);

    if (!selectedEmp) return alert("Select a valid employee");

    const newLeave = {
      id: Date.now(),
      employeeId: form.employeeId,
      name: selectedEmp.fullName,
      date: form.date,
      reason: form.reason,
      status: "Pending",
      position: selectedEmp.position,
      avatar: selectedEmp.avatar,
    };

    setLeaves([newLeave, ...leaves]);
    setForm({ employeeId: "", date: "", reason: "", status: "Pending" });
  };

  return (
    <div className="leave-page">
      <div className="applied-leaves">
        <div className="header">Applied Leaves</div>

        <form className="leave-form" onSubmit={handleAddLeave}>
          <select
            name="employeeId"
            value={form.employeeId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.fullName}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="reason"
            value={form.reason}
            onChange={handleInputChange}
            placeholder="Reason"
            required
          />
          <button type="submit">Request Leave</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Docs</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id}>
                <td>
                  <img src={leave.avatar} alt="avatar" className="avatar" />
                </td>
                <td>
                  <div className="name">{leave.name}</div>
                  <div className="position">{leave.position}</div>
                </td>
                <td>{new Date(leave.date).toLocaleDateString()}</td>
                <td>{leave.reason}</td>
                <td>
                  <select defaultValue={leave.status}>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td>📄</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaves;
