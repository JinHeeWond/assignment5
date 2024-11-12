import React, { useState } from "react";

function StudentModal({ student, onClose, onRefresh }) {
  const [name, setName] = useState(student?.name || "");
  const [age, setAge] = useState(student?.age || "");
  const [city, setCity] = useState(student?.city || "");
  const [job, setJob] = useState(student?.job || "");

  const handleSave = async () => {
    const method = student ? "PUT" : "POST";
    const url = student
      ? `https://672a2983976a834dd0226279.mockapi.io/api/vi/data/${student.id}`
      : `https://672a2983976a834dd0226279.mockapi.io/api/vi/data`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age, city, job }),
    });

    onRefresh();
    onClose();
  };

  return (
    <div className="modal show d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{student ? "Edit Student" : "Add Student"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input className="form-control mb-3" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input className="form-control mb-3" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
            <input className="form-control mb-3" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
            <input className="form-control mb-3" value={job} onChange={(e) => setJob(e.target.value)} placeholder="Job" />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentModal;

