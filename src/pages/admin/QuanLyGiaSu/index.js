import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../QuanLyNguoiDung/quanlynguoidung.scss";
import { useEffect, useState } from "react";
import {
  getAllTutors,
  createTutor,
  updateTutor,
  deleteTutor,
} from "../../../services/quanlygiasuService"; 

const QuanLyGiaSu = () => {
  const [tutors, setTutors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [formData, setFormData] = useState({
    id_user: "",
    gender: "",
    birthday: "",
    tuition: "",
    experience: "",
    achievement: "",
    method: "",
    address: "",
    fb: "",
    status: "Chờ xác nhận",
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = tutors.slice(indexOfFirstRecord, indexOfLastRecord);

  const npage = Math.ceil(tutors.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const data = await getAllTutors();
        setTutors(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách gia sư:", error);
      }
    };
    fetchTutors();
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
      const data = await createTutor(formData);
      setTutors((prev) => [...prev, data]);
      setModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi thêm gia sư:", error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedTutor) return;
    try {
      await updateTutor(formData, selectedTutor.id_tutor);
      setTutors((prev) =>
        prev.map((t) =>
          t.id_tutor === selectedTutor.id_tutor ? { ...t, ...formData } : t
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật gia sư:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTutor(id);
      setTutors((prev) => prev.filter((t) => t.id_tutor !== id));
    } catch (error) {
      console.error("Lỗi khi xóa gia sư:", error);
    }
  };

  const handleEditClick = (tutor) => {
    setSelectedTutor(tutor);
    setFormData({
      id_user: tutor.id_user || "",
      gender: tutor.gender || "",
      birthday: tutor.birthday || "",
      tuition: tutor.tuition || "",
      experience: tutor.experience || "",
      achievement: tutor.achievement || "",
      method: tutor.method || "",
      address: tutor.address || "",
      fb: tutor.fb || "",
      status: tutor.status || "Chờ xác nhận",
    });
    setModalOpen(true);
  };

  const resetFormData = () => {
    setFormData({
      id_user: "",
      gender: "",
      birthday: "",
      tuition: "",
      experience: "",
      achievement: "",
      method: "",
      address: "",
      fb: "",
      status: "Chờ xác nhận",
    });
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  return (
    <>
      <div className="container">
        <h2 className="text-center mt-5">QUẢN LÝ GIA SƯ</h2>
        <div className="d-flex justify-content-between align-items-center mb-3">
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
              setSelectedTutor(null);
              resetFormData();
              setModalOpen(true);
            }}
          >
            <i className="bi bi-file-earmark-plus"></i> Thêm gia sư
          </button>
        </div>

        <table className="table table-bordered text-center align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID User</th>
              <th>Giới tính</th>
              <th>Ngày sinh</th>
              <th>Học phí</th>
              <th>Kinh nghiệm</th>
              <th>Thành tích</th>
              <th>Phương pháp</th>
              <th>Địa chỉ</th>
              <th>Facebook</th>
              <th>Trạng thái</th>
              <th colSpan={2}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((tutor) => (
              <tr key={tutor.id_tutor}>
                <td>{tutor.id_tutor}</td>
                <td>{tutor.id_user}</td>
                <td>{tutor.gender}</td>
                <td>{new Date(tutor.birthday).toLocaleDateString()}</td>
                <td>{tutor.tuition}</td>
                <td>{tutor.experience}</td>
                <td>{tutor.achievement}</td>
                <td>{tutor.method}</td>
                <td>{tutor.address}</td>
                <td>{tutor.fb}</td>
                <td>{tutor.status}</td>
                <td style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <button className="btn btn-warning me-2" onClick={() => handleEditClick(tutor)}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(tutor.id_tutor)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav>
          <ul className="pagination pagination-container justify-content-center" style={{ color: "#10B1ff" }}>
            <li className="page-item">
              <button className="page-link" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
                Prev
              </button>
            </li>
            {numbers.map((n) => (
              <li key={n} className={`page-item ${currentPage === n ? "active" : ""}`}>
                <button className="page-link" onClick={() => changePage(n)}>
                  {n}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button className="page-link" onClick={() => changePage(currentPage + 1)} disabled={currentPage === npage}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {modalOpen && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedTutor ? "Cập nhật gia sư" : "Thêm gia sư"}</h5>
                <button type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <input type="text" id="id_user" className="form-control" placeholder="ID User" value={formData.id_user} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <select id="gender" className="form-select" value={formData.gender} onChange={handleInputChange}>
                    <option value="">Chọn giới tính</option>
                    <option value="nam">Nam</option>
                    <option value="nữ">Nữ</option>
                  </select>
                </div>
                <div className="mb-3">
                  <input type="date" id="birthday" className="form-control" placeholder="Ngày sinh" value={formData.birthday} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <input type="number" id="tuition" className="form-control" placeholder="Học phí" value={formData.tuition} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <textarea id="experience" className="form-control" placeholder="Kinh nghiệm" value={formData.experience} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <textarea id="achievement" className="form-control" placeholder="Thành tích" value={formData.achievement} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <input type="text" id="method" className="form-control" placeholder="Phương pháp" value={formData.method} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <input type="text" id="address" className="form-control" placeholder="Địa chỉ" value={formData.address} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <input type="text" id="fb" className="form-control" placeholder="Facebook" value={formData.fb} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <select id="status" className="form-select" value={formData.status} onChange={handleInputChange}>
                    <option value="Chờ xác nhận">Chờ xác nhận</option>
                    <option value="Xác nhận">Xác nhận</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Hủy
                </button>
                <button className="btn btn-primary" onClick={selectedTutor ? handleUpdate : handleSubmit}>
                  {selectedTutor ? "Cập nhật" : "Thêm"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuanLyGiaSu;