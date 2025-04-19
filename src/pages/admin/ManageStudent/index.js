import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../ManageUser/manage.scss";
import { useEffect, useState } from "react";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../../../services/StudentService";

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    id_user: "",
    class: "",
    address: "",
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = students.slice(indexOfFirstRecord, indexOfLastRecord);

  const npage = Math.ceil(students.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        setStudents(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sinh viên:", error);
      }
    };
    fetchStudents();
  }, [recordsPerPage]); // Refetch users when recordsPerPage changes

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const data = await createStudent(formData);
      setStudents((prev) => [...prev, data]);
      setModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi thêm sinh viên:", error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedStudent) return;
    try {
      await updateStudent(selectedStudent.id_student, formData);
      setStudents((prev) =>
        prev.map((s) =>
          s.id_student === selectedStudent.id_student
            ? { ...s, ...formData }
            : s
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật sinh viên:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id_student !== id));
    } catch (error) {
      console.error("Lỗi khi xóa sinh viên:", error);
    }
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setFormData({
      id_user: student.id_user || "",
      class: student.class || "",
      address: student.address || "",
    });
    setModalOpen(true);
  };

  const resetFormData = () => {
    setFormData({
      id_user: "",
      class: "",
      address: "",
    });
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  return (
    <>
      <div className="container">
        <h4 className="text-center mt-4">QUẢN LÝ HỌC VIÊN</h4>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <select
            className="form-select w-auto"
            value={recordsPerPage}
            onChange={(e) => {
              setRecordsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5 bản ghi/trang</option>
            <option value={10}>10 bản ghi/trang</option>
            <option value={15}>15 bản ghi/trang</option>
          </select>
          <button
            className="btn-add"
            onClick={() => {
              setSelectedStudent(null);
              resetFormData();
              setModalOpen(true);
            }}
          >
            <i className="bi bi-file-earmark-plus"></i> Thêm học viên
          </button>
        </div>

        <table className="table table-bordered text-center align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID User</th>
              <th>Lớp</th>
              <th>Địa chỉ</th>
              <th colSpan={2}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((student) => (
              <tr key={student.id_student}>
                <td>{student.id_student}</td>
                <td>{student.id_user}</td>
                <td>{student.class}</td>
                <td>{student.address}</td>
                <td
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEditClick(student)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(student.id_student)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav>
          <ul
            className="pagination pagination-container justify-content-center"
            style={{ color: "#10B1ff" }}
          >
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
            </li>
            {numbers.map((n) => (
              <li
                key={n}
                className={`page-item ${currentPage === n ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => changePage(n)}>
                  {n}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === npage}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {modalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedStudent ? "Cập nhật sinh viên" : "Thêm sinh viên"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <input
                    type="text"
                    id="id_user"
                    className="form-control"
                    placeholder="ID User"
                    value={formData.id_user}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    id="class"
                    className="form-control"
                    placeholder="Lớp"
                    value={formData.class}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    id="address"
                    className="form-control"
                    placeholder="Địa chỉ"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Hủy
                </button>
                <button
                  className="btn btn-primary"
                  onClick={selectedStudent ? handleUpdate : handleSubmit}
                >
                  {selectedStudent ? "Cập nhật" : "Thêm"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageStudent;
