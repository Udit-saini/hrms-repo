import React, { useState } from "react";
import "./AddCandidateModal.css";
import { useDispatch } from "react-redux";
import { addCandidate } from "../../../features/candidates/candidateSlice";

const AddCandidateModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    resume: null,
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue =
      type === "checkbox" ? checked : type === "file" ? files[0] : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // const data = new FormData();
    // data.append("fullName", formData.fullName);
    // data.append("email", formData.email);
    // data.append("phone", formData.phone);
    // data.append("position", formData.position);
    // data.append("experience", formData.experience);
    // data.append("resume", formData.resume); // Must be a file
    // data.append("agreed", formData.agreed);

    // console.log("Sending candidate data:", {
    //   ...formData,
    //   resume: formData.resume?.name,
    // });
    // console.log(data);
    dispatch(addCandidate(formData));
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add New Candidate</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-grid">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name*"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address*"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number*"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="position"
            placeholder="Position*"
            value={formData.position}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="experience"
            placeholder="Experience*"
            value={formData.experience}
            onChange={handleChange}
            required
          />
          <div className="file-upload">
            <label htmlFor="resume">Resume*</label>
            <input
              type="file"
              name="resume"
              id="resume"
              onChange={handleChange}
              accept=".pdf,.doc,.docx"
              required
            />
          </div>

          <div className="checkbox-wrapper">
            <label>
              <input
                type="checkbox"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                required
              />
              <span>
                I hereby declare that the above information is true to the best
                of my knowledge and belief.
              </span>
            </label>
          </div>

          <div className="modal-actions">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCandidateModal;
