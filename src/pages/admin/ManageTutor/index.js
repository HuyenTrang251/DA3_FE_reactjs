import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../ManageUser/manage.scss";
import { useEffect, useState } from "react";
import {
  getAllTutors,
  createTutor,
  updateTutor,
  deleteTutor,
  updateTutorStatus
} from "../../../services/TutorService";
import { getAllSubjects } from "../../../services/SubjectService";

const ManageTutor = () => {
  const [tutors, setTutors] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [formData, setFormData] = useState({
    id_user: "",
    full_name: "",
    email: "",
    phone: "",
    gender: "",
    birthday: "",
    tuition: "",
    experience: "",
    achievement: "",
    method: "",
    address: "",
    fb: "",
    status: "Chờ xác nhận",
    subjects: [],
    availability: [],
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = tutors.slice(indexOfFirstRecord, indexOfLastRecord);

  const npage = Math.ceil(tutors.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const levelOptions = ["Tiểu học", "THCS", "THPT", "Luyện thi", "Khác"];
  const dayOfWeekOptions = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
  const sessionOptions = ["Sáng", "Chiều", "Tối"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tutorData = await getAllTutors();
        setTutors(tutorData[0]);
        const subjectData = await getAllSubjects();
        setSubjects(subjectData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, [recordsPerPage]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[index] = { ...updatedSubjects[index], [field]: value };
    setFormData((prev) => ({ ...prev, subjects: updatedSubjects }));
  };

  const addSubject = () => {
    setFormData((prev) => ({
      ...prev,
      subjects: [...prev.subjects, { level: "", tuition: "", subject_name: "" }],
    }));
  };

  const removeSubject = (index) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((_, i) => i !== index),
    }));
  };

  const handleAvailabilityChange = (index, field, value) => {
    const updatedAvailability = [...formData.availability];
    updatedAvailability[index] = { ...updatedAvailability[index], [field]: value };
    setFormData((prev) => ({ ...prev, availability: updatedAvailability }));
  };

  const addAvailability = () => {
    setFormData((prev) => ({
      ...prev,
      availability: [...prev.availability, { session: "", day_of_week: "" }],
    }));
  };

  const removeAvailability = (index) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.filter((_, i) => i !== index),
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

  const openStatusModal = (tutor) => {
    setSelectedTutor(tutor);
    setNewStatus(tutor.status);
    setStatusModalOpen(true);
  };

  const handleStatusUpdate = async () => {
    if (!selectedTutor || !newStatus) return;
    try {
      await updateTutorStatus(selectedTutor.id_tutor, newStatus);
      setTutors((prev) =>
        prev.map((t) =>
          t.id_tutor === selectedTutor.id_tutor ? { ...t, status: newStatus } : t
        )
      );
      setStatusModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
  };

  const handleEditClick = (tutor) => {
    setSelectedTutor(tutor);
    setFormData({
      id_user: tutor.id_user || "",
      full_name: tutor.full_name || "",
      email: tutor.email || "",
      phone: tutor.phone || "",
      gender: tutor.gender || "",
      birthday: tutor.birthday ? new Date(tutor.birthday).toISOString().split("T")[0] : "",
      tuition: tutor.tuition || "",
      experience: tutor.experience || "",
      achievement: tutor.achievement || "",
      method: tutor.method || "",
      address: tutor.address || "",
      fb: tutor.fb || "",
      status: tutor.status || "Chờ xác nhận",
      subjects: tutor.subjects || [],
      availability: tutor.availability || [],
    });
    setModalOpen(true);
  };

  const handleViewClick = (tutor) => {
    setSelectedTutor(tutor);
    setViewModalOpen(true);
  };

  const resetFormData = () => {
    setFormData({
      id_user: "",
      full_name: "",
      email: "",
      phone: "",
      gender: "",
      birthday: "",
      tuition: "",
      experience: "",
      achievement: "",
      method: "",
      address: "",
      fb: "",
      status: "Chờ xác nhận",
      subjects: [],
      availability: [],
    });
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Chờ xác nhận":
        return "bg-warning text-dark";
      case "Xác nhận":
        return "bg-success text-white";
      case "Bị khoá":
        return "bg-danger text-white";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="container">
        <h4 className="text-center mt-4">QUẢN LÝ GIA SƯ</h4>
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
              <th>Số thứ tự</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Trạng thái</th>
              <th colSpan={4}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((tutor, index) => (
              <tr key={tutor.id_tutor}>
                <td>{indexOfFirstRecord + index + 1}</td>
                <td>{tutor.full_name}</td>
                <td>{tutor.email}</td>
                <td>{tutor.phone}</td>
                <td>{tutor.address}</td>
                <td className={`mt-2 badge ${getStatusClass(tutor.status)}`}>{tutor.status}</td>
                <td className="action-column">
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => openStatusModal(tutor)}
                      title="Cập nhật trạng thái"
                    >
                      <i className="bi bi-check-circle"></i>
                    </button>
                    <button className="btn btn-info me-2" onClick={() => handleViewClick(tutor)}>
                      <i className="bi bi-eye"></i>
                    </button>
                    <button className="btn btn-warning me-2" onClick={() => handleEditClick(tutor)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(tutor.id_tutor)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
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
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedTutor ? "Cập nhật gia sư" : "Thêm gia sư"}</h5>
                <button type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
              </div>

              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
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
                        id="full_name"
                        className="form-control"
                        placeholder="Họ tên"
                        value={formData.full_name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        id="phone"
                        className="form-control"
                        placeholder="Số điện thoại"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <select
                        id="gender"
                        className="form-select"
                        value={formData.gender}
                        onChange={handleInputChange}
                      >
                        <option value="">Chọn giới tính</option>
                        <option value="nam">Nam</option>
                        <option value="nữ">Nữ</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <input
                        type="date"
                        id="birthday"
                        className="form-control"
                        placeholder="Ngày sinh"
                        value={formData.birthday}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="number"
                        id="tuition"
                        className="form-control"
                        placeholder="Học phí"
                        value={formData.tuition}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <textarea
                        id="experience"
                        className="form-control"
                        placeholder="Kinh nghiệm"
                        value={formData.experience}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        id="achievement"
                        className="form-control"
                        placeholder="Thành tích"
                        value={formData.achievement}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        id="method"
                        className="form-control"
                        placeholder="Phương pháp"
                        value={formData.method}
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
                    <div className="mb-3">
                      <input
                        type="text"
                        id="fb"
                        className="form-control"
                        placeholder="Facebook"
                        value={formData.fb}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <select
                        id="status"
                        className="form-select"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value="Chờ xác nhận">Chờ xác nhận</option>
                        <option value="Xác nhận">Xác nhận</option>
                        <option value="Bị khoá">Xác nhận</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <h6>Môn học</h6>
                  {formData.subjects.map((subject, index) => (
                    <div key={index} className="d-flex mb-2">
                      <select
                        className="form-select me-2"
                        value={subject.level}
                        onChange={(e) => handleSubjectChange(index, "level", e.target.value)}
                      >
                        <option value="">Chọn cấp độ</option>
                        {levelOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        className="form-control me-2"
                        placeholder="Học phí"
                        value={subject.tuition}
                        onChange={(e) => handleSubjectChange(index, "tuition", e.target.value)}
                      />
                      <select
                        className="form-select me-2"
                        value={subject.subject_name}
                        onChange={(e) => handleSubjectChange(index, "subject_name", e.target.value)}
                      >
                        <option value="">Chọn môn học</option>
                        {subjects.map((subj) => (
                          <option key={subj.subject_name} value={subj.subject_name}>
                            {subj.subject_name}
                          </option>
                        ))}
                      </select>
                      <button className="btn btn-danger" onClick={() => removeSubject(index)}>
                        Xóa
                      </button>
                    </div>
                  ))}
                  <button className="btn btn-secondary" onClick={addSubject}>
                    Thêm môn học
                  </button>
                </div>
                <div className="mb-3">
                  <h6>Thời gian rảnh</h6>
                  {formData.availability.map((avail, index) => (
                    <div key={index} className="d-flex mb-2">
                      <select
                        className="form-select me-2"
                        value={avail.session}
                        onChange={(e) => handleAvailabilityChange(index, "session", e.target.value)}
                      >
                        <option value="">Chọn buổi</option>
                        {sessionOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <select
                        className="form-select me-2"
                        value={avail.day_of_week}
                        onChange={(e) => handleAvailabilityChange(index, "day_of_week", e.target.value)}
                      >
                        <option value="">Chọn ngày</option>
                        {dayOfWeekOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <button className="btn btn-danger" onClick={() => removeAvailability(index)}>
                        Xóa
                      </button>
                    </div>
                  ))}
                  <button className="btn btn-secondary" onClick={addAvailability}>
                    Thêm thời gian
                  </button>
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

      {statusModalOpen && selectedTutor && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cập nhật trạng thái gia sư: {selectedTutor.full_name}</h5>
                <button type="button" className="btn-close" onClick={() => setStatusModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="newStatus" className="form-label">Trạng thái mới</label>
                  <select
                    id="newStatus"
                    className="form-select"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="Chờ xác nhận">Chờ xác nhận</option>
                    <option value="Xác nhận">Xác nhận</option>
                    <option value="Xác nhận">Bị khoá</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setStatusModalOpen(false)}>
                  Hủy
                </button>
                <button className="btn btn-primary" onClick={handleStatusUpdate}>
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewModalOpen && selectedTutor && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thông tin gia sư: {selectedTutor.full_name}</h5>
                <button type="button" className="btn-close" onClick={() => setViewModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>ID Gia sư:</strong> {selectedTutor.id_tutor}</p>
                    <p><strong>ID User:</strong> {selectedTutor.id_user}</p>
                    <p><strong>Họ tên:</strong> {selectedTutor.full_name}</p>
                    <p><strong>Email:</strong> {selectedTutor.email}</p>
                    <p><strong>Số điện thoại:</strong> {selectedTutor.phone}</p>
                    <p><strong>Giới tính:</strong> {selectedTutor.gender}</p>
                    <p><strong>Ngày sinh:</strong> {formatDate(selectedTutor.birthday)}</p>
                    <p><strong>Học phí:</strong> {formatCurrency(selectedTutor.tuition)}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Kinh nghiệm:</strong> {selectedTutor.experience}</p>
                    <p><strong>Thành tích:</strong> {selectedTutor.achievement}</p>
                    <p><strong>Phương pháp:</strong> {selectedTutor.method}</p>
                    <p><strong>Địa chỉ:</strong> {selectedTutor.address}</p>
                    <p><strong>Facebook:</strong> {selectedTutor.fb}</p>
                    <p className={`badge ${getStatusClass(selectedTutor.status)}`}>
                      <strong>Trạng thái:</strong> {selectedTutor.status}
                    </p>
                    <p><strong>Môn học:</strong></p>
                    {selectedTutor.subjects && selectedTutor.subjects.length > 0 ? (
                      <ul>
                        {selectedTutor.subjects.map((subject, index) => (
                          <li key={index}>
                            {subject.subject_name} ({subject.level}, Học phí: {formatCurrency(subject.tuition)})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Không có môn học</p>
                    )}
                    <p><strong>Thời gian rảnh:</strong></p>
                    {selectedTutor.availability && selectedTutor.availability.length > 0 ? (
                      <ul>
                        {selectedTutor.availability.map((avail, index) => (
                          <li key={index}>
                            {avail.session} - {avail.day_of_week}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Không có thời gian rảnh</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setViewModalOpen(false)}>
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageTutor;