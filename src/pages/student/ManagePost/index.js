import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../admin/ManageUser/manage.scss";
import { useEffect, useState } from "react";
import {
  getPostByUserId,
  createPost,
  updatePost,
  deletePost,
  getStudentId,
  updateStatusResponse,
} from "../../../services/PostService";
import { getUserLogined } from "../../../services/UserService";

const ManagePost = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedResponses, setSelectedResponses] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id_student: "",
    subject: "",
    class: "",
    student_count: "",
    hours_per_session: "",
    sessions_per_week: "",
    audience: "",
    method: "",
    tuition: "",
    phone: "",
    gender: "",
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
      case "đã chấp nhận":
        return "bg-primary text-white";
      case "từ chối":
        return "bg-danger text-white";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userData = await getUserLogined();
        if (userData && userData.id) {
          setLoggedInUserId(userData.id);
          if (userData.role === "học viên") {
            const studentData = await getStudentId(userData.id);
            if (studentData && studentData.id_student) {
              setStudentId(studentData.id_student);
            } else {
              console.error("Không tìm thấy studentId trong dữ liệu trả về.");
              setStudentId(null);
            }
          }
        } else {
          console.error("Không tìm thấy userId trong dữ liệu người dùng.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng hoặc học sinh:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (studentId) {
      setFormData((prev) => ({
        ...prev,
        id_student: parseInt(studentId),
      }));
    }
  }, [studentId]);

  const userId = loggedInUserId;

  useEffect(() => {
    const fetchPosts = async () => {
      if (!userId) return;
      try {
        const data = await getPostByUserId(userId);
        // setPosts(data);
        console.log("Dữ liệu posts từ API:", data);
        // Làm sạch dữ liệu responses
        const cleanedData = data.map((post) => ({
          ...post,
          responses: Array.isArray(post.responses) ? post.responses.filter((res) => res && res.id_response) : [],
        }));
        setPosts(cleanedData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bài đăng:", error);
      }
    };
    fetchPosts();
  }, [userId, recordsPerPage]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]:
        id === "student_count" ||
        id === "hours_per_session" ||
        id === "sessions_per_week" ||
        id === "tuition"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!studentId) {
      console.error("studentId is not available.");
      alert("Không thể thêm bài đăng vì thiếu studentId.");
      return;
    }
    try {
      console.log("Dữ liệu gửi đi:", formData);
      const data = await createPost(formData);
      console.log("Dữ liệu trả về từ createPost:", data);
      setPosts((prev) => [...prev, data]);
      setModalOpen(false);
      resetFormData();
    } catch (error) {
      console.error("Lỗi khi thêm bài đăng:", error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedPost) return;
    try {
      console.log("Dữ liệu formData trước khi updatePost:", formData);
      await updatePost(selectedPost.id_post, formData);
      setPosts((prev) =>
        prev.map((p) =>
          p.id_post === selectedPost.id_post ? { ...p, ...formData } : p
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật bài đăng:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id_post !== id));
    } catch (error) {
      console.error("Lỗi khi xóa bài đăng:", error);
    }
  };

  const handleEditClick = (post) => {
    setSelectedPost(post);
    setFormData({
      id_student: post.id_student || studentId || "",
      subject: post.subject || "",
      class: post.class || "",
      student_count: post.student_count || "",
      hours_per_session: post.hours_per_session || "",
      sessions_per_week: post.sessions_per_week || "",
      audience: post.audience || "",
      method: post.method || "",
      tuition: post.tuition || "",
      phone: post.phone || "",
      gender: post.gender || "",
      address: post.address || "",
      notes: post.notes || "",
      status: post.status || "chờ duyệt",
    });
    setModalOpen(true);
  };

  const handleViewDetails = (post) => {
    setSelectedPost(post);
    setViewModalOpen(true);
  };

  const resetFormData = () => {
    setFormData({
      id_student: studentId || "",
      subject: "",
      class: "",
      student_count: "",
      hours_per_session: "",
      sessions_per_week: "",
      audience: "",
      method: "",
      tuition: "",
      phone: "",
      gender: "",
      address: "",
      notes: "",
      status: "chờ duyệt",
    });
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  // const truncateNotes = (notes) => {
  //   if (!notes) return "";
  //   if (notes.length > 10) {
  //     return notes.substring(0, 10) + "...";
  //   }
  //   return notes;
  // };

  const handleResponseStatusChange = (responseId, newStatus) => {
    setSelectedResponses((prev) =>
      prev.map((response) =>
        response.id_response === responseId
          ? { ...response, status: newStatus }
          : response
      )
    );
  };

  const handleViewResponses = (post) => {
    setSelectedPost(post);
    setSelectedResponses(post.responses || []);
    console.log("Dữ liệu selectedResponses:", post.responses);
    setResponseModalOpen(true);
  };

  const handleConfirmResponses = async () => {
    try {
      for (const response of selectedResponses) {
        if (response.id_response && response.status) {
          await updateStatusResponse(response.id_response, {
            status: response.status,
          });
        }
      }
      setPosts((prev) =>
        prev.map((post) =>
          post.id_post === selectedPost.id_post
            ? { ...post, responses: selectedResponses }
            : post
        )
      );
      setResponseModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái phản hồi:", error);
      alert("Lỗi sửa phản hồi");
    }
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <>
      <div className="container">
        <h4 className="text-center mt-4">QUẢN LÝ BÀI ĐĂNG</h4>
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
              setSelectedPost(null);
              resetFormData();
              setModalOpen(true);
            }}
            disabled={!studentId}
          >
            <i className="bi bi-file-earmark-plus"></i> Thêm bài đăng
          </button>
        </div>

        <table className="table table-bordered text-center align-middle">
          <thead>
            <tr>
              <th>STT</th>
              <th>Môn học</th>
              <th>Lớp</th>
              <th>Học phí</th>
              <th>Điện thoại</th>
              <th>Địa chỉ</th>
              <th>Trạng thái</th>
              <th>Phản hồi</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center">
                  Không có bài đăng nào.
                </td>
              </tr>
            ) : (
              currentRecords.map((post, index) => (
                <tr key={post.id_post}>
                  <td>{index + 1 + (currentPage - 1) * recordsPerPage}</td>
                  <td>{post.subject}</td>
                  <td>{post.class}</td>
                  <td>{formatCurrency(post.tuition)}</td>
                  <td>{post.phone}</td>
                  <td>{post.address}</td>
                  <td>
                    <span className={`badge ${getStatusClass(post.status)}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="response-column">
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleViewResponses(post)}
                    >
                      Xem phản hồi ({Array.isArray(post.responses) ? post.responses.length : 0})
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
                  {selectedPost ? "Cập nhật bài đăng" : "Thêm bài đăng"}
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
                    id="subject"
                    className="form-control"
                    placeholder="Môn học"
                    value={formData.subject}
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
                    type="number"
                    id="student_count"
                    className="form-control"
                    placeholder="Số lượng học viên"
                    value={formData.student_count}
                    onChange={handleInputChange}
                    min="1"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    step="0.5"
                    id="hours_per_session"
                    className="form-control"
                    placeholder="Số giờ/ buổi"
                    value={formData.hours_per_session}
                    onChange={handleInputChange}
                    min="0.5"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    id="sessions_per_week"
                    className="form-control"
                    placeholder="Số buổi/ tuần"
                    value={formData.sessions_per_week}
                    onChange={handleInputChange}
                    min="1"
                  />
                </div>
                <div className="mb-3">
                  <select
                    id="audience"
                    className="form-select"
                    value={formData.audience}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn đối tượng dạy</option>
                    <option value="giáo viên">Giáo viên</option>
                    <option value="sinh viên">Sinh viên</option>
                  </select>
                </div>
                <div className="mb-3">
                  <select
                    id="method"
                    className="form-select"
                    value={formData.method}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn hình thức học</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    id="tuition"
                    className="form-control"
                    placeholder="Học phí"
                    value={formData.tuition}
                    onChange={handleInputChange}
                    min="0"
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
                    type="text"
                    id="address"
                    className="form-control"
                    placeholder="Địa chỉ"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    id="notes"
                    className="form-control"
                    placeholder="Ghi chú"
                    value={formData.notes}
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
                  onClick={selectedPost ? handleUpdate : handleSubmit}
                >
                  {selectedPost ? "Cập nhật" : "Thêm"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                {selectedResponses.length > 0 &&
                selectedResponses[0].id_response ? (
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Người phản hồi</th>
                        <th>Nội dung</th>
                        <th>Thời gian</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedResponses.map((response, index) => (
                        <tr key={response.id_response}>
                          <td>{index + 1}</td>
                          <td>{response.tutor_name}</td>
                          <td className="notes-column">{response.message}</td>
                          <td>{formatDate(response.created_at)}</td>
                          <td>
                            <select
                              className="form-select"
                              value={response.status || "chờ phản hồi"}
                              onChange={(e) =>
                                handleResponseStatusChange(
                                  response.id_response,
                                  e.target.value
                                )
                              }
                            >
                              <option value="chờ phản hồi">Chờ phản hồi</option>
                              <option value="đã chấp nhận">Đồng ý</option>
                              <option value="từ chối">Từ chối</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Chưa có phản hồi cho bài đăng này.</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setResponseModalOpen(false)}
                >
                  Hủy
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleConfirmResponses}
                  disabled={
                    !selectedResponses.length ||
                    !selectedResponses[0].id_response
                  }
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
    </>
  );
};

export default ManagePost;