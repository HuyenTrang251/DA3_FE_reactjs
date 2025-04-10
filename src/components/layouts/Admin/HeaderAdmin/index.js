import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./HeaderAdmin.scss";
import { useEffect, useState } from "react";
function HeaderAdmin({ toggleSidebar }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    // const [userImg, setUserImg] = useState("/image/adminDefault.png");
    // const taiKhoan = localStorage.getItem("taiKhoan");

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //     if (!taiKhoan) return;

    //     try {
    //         const users = await getAllUsers();
    //         const user = users.find((u) => u.taiKhoan === taiKhoan);

    //         if (user?.anhThe?.length > 0) {
    //         setUserImg(`http://localhost:3001${user.anhThe[0]}`);
    //         }
    //     } catch (error) {
    //         console.error(
    //         "Lỗi khi lấy thông tin người dùng:",
    //         error.response?.data || error.message
    //         );
    //     }
    //     };

    //     fetchUserData();
    // }, [taiKhoan]);

    const handleLogout = () => {
        // localStorage.removeItem("token");
        // localStorage.removeItem("taiKhoan");
        navigate("/");
    };
    return (
        <>
        <div className="header-admin">
        <div className="header-left">
            <i className="bi bi-list menu-icon" onClick={toggleSidebar} />
            <img className="logo" src="/image/logo_Htrang.png" alt="Logo" />
        </div>

        <div className="header-center">
            <form className="search-form">
            <input
                type="search"
                className="search-input"
                placeholder="Tìm kiếm thông tin ...."
            />
            <span className="search-icon">
                <i className="bi bi-search"></i>
            </span>
            </form>
        </div>

        <div className="header-right">
            <Link className="nav-link" to="/theme">
            <i className="bi bi-palette"></i>
            </Link>
            <Link
            className="nav-link"
            to="https://github.com/Ahhinhlll"
            target="_blank"
            >
            <i className="bi bi-github"></i>
            </Link>

            {/* Dropdown Avatar */}
            <div className="user-dropdown">
            <button
                className="avatar-btn"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <img src='/image/gs.jpg' alt="Avatar" />
                <i className="bi bi-caret-down-fill dropdown-icon ms-1"></i>
            </button>

            {showDropdown && (
                <ul className="dropdown-menu show">
                <li>
                    <Link className="dropdown-item" to="/admin/ho-so-admin">
                    <i className="bi bi-person-circle"></i> Hồ sơ
                    </Link>
                </li>
                <li>
                    <button className="dropdown-item logout" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right"></i> Đăng xuất
                    </button>
                </li>
                </ul>
            )}
            </div>
        </div>
        </div>
        </>
    )
}
export default HeaderAdmin