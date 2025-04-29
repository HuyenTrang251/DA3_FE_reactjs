import { Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import "../pages/HomePage/home.scss";

function Login() {
  const [password, setPassword] = useState("");
  const [username, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const setEmailHandler = (event) => {
    setEmail(event.target.value);
    console.log("Username changed:", event.target.value);
  };

  const setPasswordHandler = (event) => {
    setPassword(event.target.value);
    console.log("Password changed:", event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Username khi login:", username);
    console.log("Password khi login:", password);
    const response = await fetch("http://localhost:3300/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    // console.log(data);
    // console.log(data.userdata.role);

    if (response.ok) {
      Cookies.set("token", data.token, {
        path: "/",
        secure: true,
        httpOnly: false,
      });
      console.log(data.userdata);
      // localStorage.setItem("id", data.userdata.id);
      // localStorage.setItem("img", data.userdata.img);
      // localStorage.setItem("name", data.userdata.name);

      const role = data.userdata.role;
      if (role === "gia sư") {
        window.location.href = "/tutor";
      } else if (role === "học viên") {
        window.location.href = "/student";
      } else if (role === "admin") {
        window.location.href = "/admin";
      } else {
        alert("Không có quyền truy cập!");
      }
    } else {
      alert("Đăng nhập thất bại!");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <section className="sectionLogin">
        <div className="containerLogin d-flex justify-content-center align-items-center">
          <div className="card p-4" style={{ width: 600 }}>
            <img
              src="/image/logo_Htrang.png"
              alt="logo"
              className="mx-auto my-3"
              style={{ width: "65px" }}
            />
            <h4 className="text-center mb-3" style={{ color: "black" }}>
              Xin chào!
            </h4>
            <p className="text-center mb-5" style={{ color: "#333" }}>
              Đăng nhập để tiếp tục
            </p>
            <form className="form-Login">
              <div className="mb-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  required=""
                  value={username}
                  onChange={setEmailHandler}
                />
              </div>
              <div className="mb-4" style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Mật khẩu"
                  required=""
                  value={password}
                  onChange={setPasswordHandler}
                />
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "70px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
              <div className="d-flex mb-4">
                <input
                  type="checkbox"
                  id="cbox"
                  style={{
                    width: "20px",
                    marginLeft: "55px",
                    marginRight: "10px",
                  }}
                />
                <label htmlFor="cbox">Ghi nhớ</label>
                <Link
                  to="/quen-mat-khau"
                  style={{ marginLeft: "230px", textDecoration: "none" }}
                >
                  Quên mật khẩu?{" "}
                </Link>
              </div>
              <button className="btnDN mb-3" onClick={handleLogin}>
                Đăng nhập
              </button>
              <div className="d-flex" style={{ marginLeft: "150px" }}>
                <p className="me-3">Bạn chưa có tài khoản?</p>
                <Link to="/dang-ki" style={{ textDecoration: "none" }}>
                  Đăng kí
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
