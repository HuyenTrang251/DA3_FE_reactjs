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
} from "../../../services/PostService";

const ManagePost = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
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

  useEffect(() => {
    const userIdFromAuth = localStorage.getItem("id");
    if (userIdFromAuth) {
      setLoggedInUserId(parseInt(userIdFromAuth));
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            if (loggedInUserId) {
                const data = await getPostByUserId(loggedInUserId);
                setPosts(data);
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách bài đăng:", error);
        }
    };
    fetchPosts();
  }, [loggedInUserId, recordsPerPage]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
        const data = await createPost(formData);
        setPosts((prev) => [...prev, data]);
        setModalOpen(false);
    } catch (error) {
        console.error("Lỗi khi thêm bài đăng:", error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedPost) return;
    try {
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
      id_student: post.id_student || "",
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

  const resetFormData = () => {
    setFormData({
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
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  const truncateNotes = (notes) => {
    if (!notes) return "";
    if (notes.length > 10) {
      return notes.substring(0, 10) + "...";
    }
    return notes;
  };

  const handleNotesClick = (e) => {
    const fullNotes = e.target.getAttribute("data-full-notes");
    if (fullNotes) {
      alert(fullNotes);
    }
  };

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
          >
            <i className="bi bi-file-earmark-plus"></i> Thêm bài đăng
          </button>
        </div>

        <table className="table table-bordered text-center align-middle">
          <thead>
            <tr>
              <th>STT</th>
              {/* <th>ID Student</th> */}
              <th>Môn học</th>
              <th>Lớp</th>
              <th style={{ width: "10px" }}>Số hv</th>
              <th style={{ width: "10px" }}>giờ/ buổi</th>
              <th style={{ width: "10px" }}>buổi/ tuần</th>
              <th>Đối tượng</th>
              <th>Hình thức</th>
              <th>Học phí</th>
              <th>Điện thoại</th>
              <th>Giới tính</th>
              <th>Địa chỉ</th>
              <th>Ghi chú</th>
              <th>Trạng thái</th>
              <th colSpan={2}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((post, index) => (
              <tr key={post.id_post}>
                <td>{index + 1 + (currentPage - 1) * recordsPerPage}</td>
                {/* <td>{post.id_student}</td> */}
                <td>{post.subject}</td>
                <td>{post.class}</td>
                <td>{post.student_count}</td>
                <td>{post.hours_per_session}</td>
                <td>{post.sessions_per_week}</td>
                <td>{post.audience}</td>
                <td>{post.method}</td>
                <td>{post.tuition}</td>
                <td>{post.phone}</td>
                <td>{post.gender}</td>
                <td>{post.address}</td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={handleNotesClick}
                  data-full-notes={post.notes}
                >
                  {truncateNotes(post.notes)}
                </td>
                <td>{post.status}</td>
                <td
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEditClick(post)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(post.id_post)}
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
                    id="id_student"
                    className="form-control"
                    placeholder="ID Student"
                    value={formData.id_student}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    id="subject"
                    className="form-control"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    id="class"
                    className="form-control"
                    placeholder="Class"
                    value={formData.class}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    id="student_count"
                    className="form-control"
                    placeholder="Student Count"
                    value={formData.student_count}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    step="0.5"
                    id="hours_per_session"
                    className="form-control"
                    placeholder="Hours/Session"
                    value={formData.hours_per_session}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    id="sessions_per_week"
                    className="form-control"
                    placeholder="Sessions/Week"
                    value={formData.sessions_per_week}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <select
                    id="audience"
                    className="form-select"
                    value={formData.audience}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn Audience</option>
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
                    <option value="">Chọn Method</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    id="tuition"
                    className="form-control"
                    placeholder="Tuition"
                    value={formData.tuition}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    id="phone"
                    className="form-control"
                    placeholder="Phone"
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
                    <option value="">Chọn Giới tính</option>
                    <option value="nam">Nam</option>
                    <option value="nữ">Nữ</option>
                  </select>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    id="address"
                    className="form-control"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    id="notes"
                    className="form-control"
                    placeholder="Notes"
                    value={formData.notes}
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
                    <option value="chờ duyệt">Chờ duyệt</option>
                    <option value="đã duyệt">Đã duyệt</option>
                    <option value="đã huỷ">Đã huỷ</option>
                  </select>
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
    </>
  );
};

export default ManagePost;
