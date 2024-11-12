import React, { useState, useEffect } from "react";
import StudentModal from "../StudentModal";

function ShowList() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 학생 데이터를 가져오는 함수
  const fetchStudents = async () => {
    const response = await fetch("https://672a2983976a834dd0226279.mockapi.io/api/vi/data");
    const data = await response.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 모달 열기 함수
  const handleOpenModal = (student = null) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setSelectedStudent(null);
    setShowModal(false);
  };

  // 삭제 함수 추가
  const handleDelete = async (id) => {
    try {
      await fetch(`https://672a2983976a834dd0226279.mockapi.io/api/vi/data/${id}`, {
        method: "DELETE",
      });
      fetchStudents(); // 데이터 목록을 갱신합니다
    } catch (error) {
      console.error("삭제 오류:", error);
    }
  };

  return (
    <div className="container">
      <h1>Student List</h1>
      <button className="btn btn-primary" onClick={() => handleOpenModal()}>Add Student</button>
      <ul className="list-group mt-3">
        {students.map((student) => (
          <li key={student.id} className="list-group-item d-flex justify-content-between">
            {student.name} ({student.age}, {student.city}, {student.job})
            <div>
              <button className="btn btn-secondary me-2" onClick={() => handleOpenModal(student)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleDelete(student.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {showModal && (
        <StudentModal
          student={selectedStudent}
          onClose={handleCloseModal}
          onRefresh={fetchStudents}
        />
      )}
    </div>
  );
}

export default ShowList;
