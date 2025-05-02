import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../ManageUser/manage.scss";
import { useEffect, useState } from "react";
import {
  getAllPostsWithResponse,
  createPost,
  updatePost,
  deletePost,
  updateStatusPost,
} from "../../../services/PostService";
import { getAllForAdminPost } from "../../../services/StudentService";

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedResponses, setSelectedResponses] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id_student: "",
    subject: "",
    class: "",
    student_count: 1,
    hours_per_session: 1,
    sessions_per_week: 1,
    audience: "sinh viên",
    method: "offline",
    tuition: "",
    phone: "",
    gender: "nam",
    address: "",
    notes: "",
    status: "chờ duyệt",
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = posts.slice(indexOfFirstRecord, indexOfLastRecord);

  const npage = Math.ceil(posts.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  // Format currency (VND)
  const formatCurrency = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  // Format date to DD/MM/YYYY HH:mm
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status class for coloring
  const getStatusClass = (status) => {
    switch (status) {
      case "chờ duyệt":
        return "bg-warning text-dark";
      case "đã duyệt":
        return "bg-success text-white";
      case "đã huỷ":
        return "bg-danger text-white";
      case "chờ phản hồi":
        return "bg-secondary text-white";
      case "đồng ý":
        return "bg-primary text-white";
      case "từ chối":
        return "bg-danger text-white";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postData, studentData] = await Promise.all([
          getAllPostsWithResponse(),
          getAllForAdminPost(),
        ]);

        if (!postData || !Array.isArray(postData) || !Array.isArray(postData[0])) {
          console.error("Dữ liệu bài đăng không hợp lệ:", postData);
          setError("Không thể tải danh sách bài đăng.");
          setPosts([]);
        } else {
          setPosts(postData[0]);
          setError("");
        }

        if (!studentData || !Array.isArray(studentData) || !Array.isArray(studentData[0])) {
          console.error("Dữ liệu học viên không hợp lệ:", studentData);
          setError("Không thể tải danh sách học viên.");
          setStudents([]);
        } else {
          setStudents(studentData[0]);
          setError("");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setError(error.response?.data?.message || "Không thể tải danh sách bài đăng.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [recordsPerPage]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]:
        id === "student_count" ||
        id === "hours_per_session" ||
        id === "sessions_per_week" ||
        id === "id_student"
          ? Number(value)
          : id === "tuition"
          ? value
          : value,
    }));
  };

  const validateForm = () => {
    if (!formData.id_student) return "Vui lòng chọn học viên.";
    if (!formData.subject) return "Vui lòng nhập môn học.";
    if (!formData.class) return "Vui lòng nhập lớp.";
    if (formData.student_count < 1) return "Số học viên phải lớn hơn 0.";
    if (formData.hours_per_session <= 0) return "Số giờ mỗi buổi phải lớn hơn 0.";
    if (formData.sessions_per_week < 1) return "Số buổi mỗi tuần phải lớn hơn 0.";
    if (formData.tuition && isNaN(formData.tuition)) return "Học phí phải là số.";
    return "";
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const postData = { ...formData, tuition: Number(formData.tuition) || null };
      const data = await createPost(postData);
      setPosts((prev) => [...prev, data]);
      setModalOpen(false);
      resetFormData();
      setError("");
    } catch (error) {
      console.error("Lỗi khi thêm bài đăng:", error);
      setError(error.response?.data?.message || "Không thể thêm bài đăng.");
    }
  };

  const handleUpdate = async () => {
    if (!selectedPost) return;
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    if (!window.confirm("Bạn có chắc muốn cập nhật bài đăng này?")) return;
    try {
      const postData = { ...formData, tuition: Number(formData.tuition) || null };
      await updatePost(selectedPost.id_post, postData);
      setPosts((prev) =>
        prev.map((p) =>
          p.id_post === selectedPost.id_post ? { ...p, ...postData } : p
        )
      );
      setModalOpen(false);
      resetFormData();
      setError("");
    } catch (error) {
      console.error("Lỗi khi cập nhật bài đăng:", error);
      setError(error.response?.data?.message || "Không thể cập nhật bài đăng.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa bài đăng này?")) return;
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id_post !== id));
      setError("");
    } catch (error) {
      console.error("Lỗi khi xóa bài đăng:", error);
      setError(error.response?.data?.message || "Không thể xóa bài đăng.");
    }
  };

  const handleStatusChange = async () => {
    if (!selectedPost || !newStatus) return;
    try {
      await updateStatusPost(selectedPost.id_post, { status: newStatus });
      setPosts((prev) =>
        prev.map((p) =>
          p.id_post === selectedPost.id_post ? { ...p, status: newStatus } : p
        )
      );
      setStatusModalOpen(false);
      setNewStatus("");
      setError("");
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái bài đăng:", error);
      setError(
        error.response?.data?.message || "Không thể cập nhật trạng thái bài đăng."
      );
    }
  };

  const handleEditClick = (post) => {
    setSelectedPost(post);
    setFormData({
      id_student: post.id_student || "",
      subject: post.subject || "",
      class: post.class || "",
      student_count: post.student_count || 1,
      hours_per_session: post.hours_per_session || 1,
      sessions_per_week: post.sessions_per_week || 1,
      audience: post.audience || "sinh viên",
      method: post.method || "offline",
      tuition: post.tuition || "",
      phone: post.phone || "",
      gender: post.gender || "nam",
      address: post.address || "",
      notes: post.notes || "",
      status: post.status || "chờ duyệt",
    });
    setModalOpen(true);
  };

  const handleStatusClick = (post) => {
    setSelectedPost(post);
    setNewStatus(post.status);
    setStatusModalOpen(true);
  };

  const handleViewResponses = (post) => {
    setSelectedPost(post);
    setSelectedResponses(post.responses || []);
    setResponseModalOpen(true);
  };

  const handleViewDetails = (post) => {
    setSelectedPost(post);
    setViewModalOpen(true);
  };

  const resetFormData = () => {
    setFormData({
      id_student: "",
      subject: "",
      class: "",
      student_count: 1,
      hours_per_session: 1,
      sessions_per_week: 1,
      audience: "sinh viên",
      method: "offline",
      tuition: "",
      phone: "",
      gender: "nam",
      address: "",
      notes: "",
      status: "chờ duyệt",
    });
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  if (loading) {
    return <div className="text-center mt-4">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="container">
      <h4 className="text-center mt-4">QUẢN LÝ BÀI ĐĂNG</h4>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
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
          className="btn btn-primary"
          onClick={() => {
            setSelectedPost(null);
            resetFormData();
            setModalOpen(true);
          }}
        >
          <i className="bi bi-file-earmark-plus"></i> Thêm bài đăng
        </button>
      </div>

      <div className="table-posts">
        <table className="table table-bordered text-center align-middle">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên học viên</th>
              <th>Email</th>
              <th>Môn học</th>
              <th>Lớp</th>
              <th>Trạng thái</th>
              <th>Phản hồi</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  Không có bài đăng nào.
                </td>
              </tr>
            ) : (
              currentRecords.map((post) => (
                <tr key={post.id_post}>
                  <td>{post.id_post}</td>
                  <td>{post.student_name}</td>
                  <td className="email-column">{post.student_email}</td>
                  <td>{post.subject}</td>
                  <td>{post.class}</td>
                  <td>
                    <span className={`badge ${getStatusClass(post.status)}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="response-column">
                    <button
                      className="btn btn-secondary btn-success btn-sm"
                      onClick={() => handleViewResponses(post)}
                    >
                      Xem phản hồi ({post.responses ? post.responses.length : 0})
                    </button>
                  </td>
                  <td className="action-column">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleViewDetails(post)}
                        title="Xem chi tiết"
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => handleStatusClick(post)}
                        title="Cập nhật trạng thái"
                      >
                        <i className="bi bi-check-square"></i>
                      </button>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEditClick(post)}
                        title="Chỉnh sửa"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(post.id_post)}
                        title="Xóa"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {posts.length > 0 && (
        <nav>
          <ul className="pagination justify-content-center">
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
      )}

      {/* Modal chỉnh sửa/thêm bài đăng */}
      {modalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedPost ? "Cập nhật bài đăng" : "Thêm bài đăng"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                ></button>
              </div>

              <div className="modal-body">
                {error && (
                  <div className="alert alert-danger mb-3">{error}</div>
                )}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <select
                      id="id_student"
                      className="form-control"
                      value={formData.id_student}
                      onChange={handleInputChange}
                    >
                      <option value="">Chọn học viên</option>
                      {students.map((student) => (
                        <option
                          key={student.id_student}
                          value={student.id_student}
                        >
                          {student.full_name} (ID: {student.id_student})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      id="subject"
                      className="form-control"
                      placeholder="Môn học"
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      id="class"
                      className="form-control"
                      placeholder="Lớp"
                      value={formData.class}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="number"
                      id="student_count"
                      className="form-control"
                      placeholder="Số học viên"
                      value={formData.student_count}
                      onChange={handleInputChange}
                      min="1"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="number"
                      id="hours_per_session"
                      className="form-control"
                      placeholder="Số giờ mỗi buổi"
                      value={formData.hours_per_session}
                      onChange={handleInputChange}
                      step="0.5"
                      min="0.5"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="number"
                      id="sessions_per_week"
                      className="form-control"
                      placeholder="Số buổi mỗi tuần"
                      value={formData.sessions_per_week}
                      onChange={handleInputChange}
                      min="1"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <select
                      id="audience"
                      className="form-control"
                      value={formData.audience}
                      onChange={handleInputChange}
                    >
                      <option value="sinh viên">Sinh viên</option>
                      <option value="giáo viên">Giáo viên</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <select
                      id="method"
                      className="form-control"
                      value={formData.method}
                      onChange={handleInputChange}
                    >
                      <option value="offline">Offline</option>
                      <option value="online">Online</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="number"
                      id="tuition"
                      className="form-control"
                      placeholder="Học phí"
                      value={formData.tuition}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      id="phone"
                      className="form-control"
                      placeholder="Số điện thoại liên hệ"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <select
                      id="gender"
                      className="form-control"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="nam">Nam</option>
                      <option value="nữ">Nữ</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      id="address"
                      className="form-control"
                      placeholder="Địa chỉ"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <textarea
                      id="notes"
                      className="form-control"
                      placeholder="Ghi chú"
                      value={formData.notes}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setModalOpen(false);
                    setError("");
                  }}
                >
                  Hủy
                </button>
                <button
                  className="btn btn-primary"
                  onClick={selectedPost ? handleUpdate : handleSubmit}
                >
                  {selectedPost ? "Cập nhật" : "Thêm"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal cập nhật trạng thái */}
      {statusModalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cập nhật trạng thái bài đăng</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setStatusModalOpen(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <select
                    id="status"
                    className="form-control"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="chờ duyệt">Chờ duyệt</option>
                    <option value="đã duyệt">Đã duyệt</option>
                    <option value="đã huỷ">Đã huỷ</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setStatusModalOpen(false)}
                >
                  Hủy
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleStatusChange}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal xem phản hồi */}
      {responseModalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Danh sách phản hồi</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setResponseModalOpen(false)}
                ></button>
              </div>

              <div className="modal-body">
                {selectedResponses.length === 0 ? (
                  <p className="text-center">Không có phản hồi nào.</p>
                ) : (
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Giáo viên</th>
                        <th>Email</th>
                        <th>SĐT</th>
                        <th>Trạng thái</th>
                        <th>Tin nhắn</th>
                        <th>Ngày phản hồi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedResponses.map((response) => (
                        <tr key={response.id_response}>
                          <td>{response.id_response}</td>
                          <td>{response.tutor_name}</td>
                          <td className="email-column">{response.tutor_email}</td>
                          <td>{response.tutor_phone}</td>
                          <td>
                            <span className={`badge ${getStatusClass(response.status)}`}>
                              {response.status}
                            </span>
                          </td>
                          <td className="notes-column">{response.message}</td>
                          <td>{formatDate(response.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setResponseModalOpen(false)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal xem chi tiết bài đăng */}
      {viewModalOpen && selectedPost && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chi tiết bài đăng</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setViewModalOpen(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <strong>ID:</strong> {selectedPost.id_post}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Tên học viên:</strong> {selectedPost.student_name}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Email:</strong> {selectedPost.student_email}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>SĐT học viên:</strong> {selectedPost.student_phone}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Môn học:</strong> {selectedPost.subject}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Lớp:</strong> {selectedPost.class}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Số học viên:</strong> {selectedPost.student_count}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Giờ mỗi buổi:</strong> {selectedPost.hours_per_session}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Buổi mỗi tuần:</strong> {selectedPost.sessions_per_week}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Đối tượng:</strong> {selectedPost.audience}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Hình thức:</strong> {selectedPost.method}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Học phí:</strong> {formatCurrency(selectedPost.tuition)}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>SĐT liên hệ:</strong> {selectedPost.phone}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Giới tính:</strong> {selectedPost.gender}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Địa chỉ:</strong> {selectedPost.address}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Ghi chú:</strong> {selectedPost.notes}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Trạng thái:</strong>{" "}
                    <span className={`badge ${getStatusClass(selectedPost.status)}`}>
                      {selectedPost.status}
                    </span>
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Ngày tạo:</strong> {formatDate(selectedPost.created_at)}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setViewModalOpen(false)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePosts;