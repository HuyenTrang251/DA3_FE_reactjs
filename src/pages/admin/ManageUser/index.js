import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./manage.scss";
import { useEffect, useState } from "react";
import {
  createUserWithImg,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../../../services/UserService";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    img: "",
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role: "học viên",
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
  // const totalPages = Math.ceil(users.length / recordsPerPage);

  const npage = Math.ceil(users.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
      }
    };
    fetchUsers();
  }, [recordsPerPage]); //call lại api khi recordsPerPage thay đổi

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "img" && files) {
      setFormData((prev) => ({ ...prev, img: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const data = await createUserWithImg(formDataToSend);
      setUsers((prev) => [...prev, data]);
      setModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi thêm người dùng:", error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      formDataToSend.append("id_user", selectedUser.id_user);
      await updateUser(formDataToSend);
      setUsers((prev) =>
        prev.map((u) =>
          u.id_user === selectedUser.id_user ? { ...u, ...formData } : u
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id_user !== id));
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({
      img: user.img || "",
      full_name: user.full_name || "",
      email: user.email || "",
      phone: user.phone || "",
      password: user.password || "",
      role: user.role || "học viên",
    });
    setModalOpen(true);
  };

  const resetFormData = () => {
    setFormData({
      img: "",
      full_name: "",
      email: "",
      phone: "",
      password: "",
      role: "học viên",
    });
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  return (
    <>
      <div className="container">
        <h4 className="text-center mt-4">QUẢN LÝ NGƯỜI DÙNG</h4>
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
              setSelectedUser(null);
              resetFormData();
              setModalOpen(true);
            }}
          >
            <i className="bi bi-file-earmark-plus"></i> Thêm người dùng
          </button>
        </div>

        <table className="table table-bordered text-center align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ảnh</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Điện thoại</th>
              <th>Vai trò</th>
              <th colSpan={2}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((user) => (
              <tr key={user.id_user} style={{ height: "50px" }}>
                <td className="item-row">{user.id_user}</td>
                <td className="item-row">
                  {user.img ? (
                    <img
                      src={`http://localhost:3300/uploads/${user.img}`}
                      alt="anh"
                      style={{
                        width: "35px",
                        height: "45px",
                        objectFit: "contain",
                      }}
                    />
                  ) : ('')}
                </td>
                <td>{user.full_name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className="btn btn-warning me-2"
                    style={{fontSize: '15px'}}
                    onClick={() => handleEditClick(user)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-danger"
                    style={{ fontSize: "15px" }}
                    onClick={() => handleDelete(user.id_user)}
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
                  {selectedUser ? "Cập nhật người dùng" : "Thêm người dùng"}
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
                    type="file"
                    id="img"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFormData((prev) => ({ ...prev, img: file })); // Lưu trữ tệp ảnh, không phải base64
                      }
                    }}
                  />
                  {formData.img &&
                    typeof formData.img !== "string" && ( // Kiểm tra nếu formData.img là một File object
                      <img
                        src={URL.createObjectURL(formData.img)} // Tạo URL tạm thời từ tệp ảnh
                        alt="Preview"
                        style={{ maxWidth: "100px", marginTop: "10px" }}
                      />
                    )}
                </div>
                 <div className="mb-3">
                  <input
                    type="text"
                    id="img"
                    className="form-control"
                    placeholder="Ảnh"
                    value={formData.img}
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
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Mật khẩu"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <select
                    id="role"
                    className="form-select"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option value="gia sư">Gia sư</option>
                    <option value="học viên">Học viên</option>
                    <option value="admin">Admin</option>
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
                  onClick={selectedUser ? handleUpdate : handleSubmit}
                >
                  {selectedUser ? "Cập nhật" : "Thêm"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )};
    </>
  );
};

export default ManageUser;
