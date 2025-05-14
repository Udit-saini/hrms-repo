import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { editEmployee } from "../../../src/features/candidates/employees/employeesSlice";

const Attendance = () => {
  const { employees } = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  const selectedEmployees = employees.filter(
    (emp) => emp.status === "Selected"
  );

  const onFilterChange = (empId, newStatus) => {
    const updatedEmployee = {
      ...selectedEmployees.find((emp) => emp._id === empId),
      status2: newStatus,
    };

    dispatch(editEmployee({ id: empId, updatedData: updatedEmployee }));
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Profile</th>
            <th>Candidates Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {selectedEmployees.map((emp, index) => (
            <tr key={emp._id || index}>
              <td>
                <img src={emp.avatar} alt="avatar" className="avatar" />
              </td>
              <td>{emp.fullName}</td>
              <td>{emp.position}</td>
              <td>{emp.department}</td>
              <td>
                <select
                  className="dropdown"
                  value={emp.status2}
                  onChange={(e) => onFilterChange(emp._id, e.target.value)}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Medical Leave">Medical Leave</option>
                  <option value="Work From Home">Work From Home</option>
                </select>
              </td>
              <td>⋮</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
