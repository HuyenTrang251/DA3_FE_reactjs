import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.scss";
import { createUser } from "../../services/UserService"; 
function SignupPage() {
  const [formData, setFormData] = useState({
    img: "",
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role: "học viên", 
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRoleChange = (e) => {
    setFormData((prev) => ({ ...prev, role: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // Basic validation
    if (!formData.full_name.trim()) {
      setError("Họ tên không được để trống.");
      return;
    }
    if (!formData.email.trim()) {
      setError("Email không được để trống.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Email không hợp lệ.");
      return;
    }
    if (!formData.phone.trim()) {
      setError("Số điện thoại không được để trống.");
      return;
    }
    // if (!/^\d{10}$/.test(formData.phone)) {
    //     setError("Số điện thoại không hợp lệ.");
    //     return;
    // }
    if (!formData.password.trim()) {
      setError("Mật khẩu không được để trống.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }
    if (formData.password !== confirmPassword) {
      setError("Mật khẩu không khớp.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const data = await createUser(formDataToSend);
      console.log("Đăng ký thành công:", data);
      setError(""); // Xóa lỗi nếu thành công
      // Chuyển hướng người dùng đến trang đăng nhập hoặc trang chủ
      navigate("/dang-nhap");
    //   setUsers((prev) => [...prev, data]);
    //   setModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi thêm người dùng:", error);
      setError(error.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
    // setError(""); // Clear any previous error
    // try {
    //     // const data = await createUser(formData); // Removed FormData, send as JSON
    //     // console.log("User created:", data);
    //     // Redirect or show success message here
    //     console.log("Form Data:", formData);
    // } catch (error: any) {
    //     console.error("Lỗi khi đăng ký:", error);
    //     setError(error.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
    // }
  };

  return (
    <>
      <div className="containerSignup d-flex justify-content-center align-items-center">
        <div className="card p-4" style={{ width: 500 }}>
          <h4 className="text-center mb-3" style={{ color: "#0c024c" }}>
            ĐĂNG KÝ
          </h4>
          <p className="me-3 fs-5">Nhập thông tin của bạn:</p>
          <form className="d-flex mb-3">
            <div className="rdoRole">
              <input
                type="radio"
                id="tutor"
                name="role"
                value="gia sư"
                checked={formData.role === "gia sư"}
                onChange={handleRoleChange}
              />
              <label htmlFor="tutor" className="ms-2">
                Gia sư
              </label>
            </div>
            <div className="rdoRole">
              <input
                type="radio"
                id="student"
                name="role"
                value="học viên"
                checked={formData.role === "học viên"}
                onChange={handleRoleChange}
              />
              <label htmlFor="student" className="ms-2">
                Học viên
              </label>
            </div>
          </form>

          <form className="form-SignUp" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                id="full_name"
                className="form-control"
                placeholder="Họ tên"
                required
                value={formData.full_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="phone"
                className="form-control"
                placeholder="Số điện thoại"
                required
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4" style={{ position: "relative" }}>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                className="form-control"
                placeholder="Mật khẩu"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
              <i
                className={`bi ${passwordVisible ? "bi-eye-slash" : "bi-eye"}`}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={() => setPasswordVisible(!passwordVisible)}
              ></i>
            </div>
            <div className="mb-4" style={{ position: "relative" }}>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                className="form-control"
                placeholder="Nhập lại mật khẩu"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <i
                className={`bi ${
                  confirmPasswordVisible ? "bi-eye-slash" : "bi-eye"
                }`}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              ></i>
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btnDK w-100 mb-3" onClick={handleSubmit}>
              Đăng ký
            </button>
            <div className="d-flex mb-2" style={{ marginLeft: "120px" }}>
              <p className="me-3">Bạn đã có tài khoản?</p>
              <Link to="/dang-nhap" style={{ textDecoration: "none" }}>
                Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
