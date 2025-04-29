import { Link, useNavigate } from "react-router-dom";
import {useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./HeaderAdmin.scss";
import { getUserLogined } from "../../../../services/UserService";

function HeaderAdmin({ toggleSidebar }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [userData, setUserData] = useState([null]);
    const navigate = useNavigate();
    // const img = localStorage.getItem("img");

    const handleLogout = () => {
        navigate("/dang-nhap");
    };

    useEffect(() => {
        const FetchUserData = async () =>{
            const data = await getUserLogined();
            if (data) {
                setUserData({
                    img: data.img,          
                    name: data.name,       
                });
            } else {
                setUserData({ img: '', name: 'User' });
            }
        };
        FetchUserData();
    }, []);

    const userImage = userData?.img;

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
            {/* <Link className="nav-link" to="/theme">
            <i className="bi bi-palette"></i>
            </Link>
            <Link
            className="nav-link"
            to="https://github.com/HuyenTrang251"
            target="_blank"
            >
            <i className="bi bi-github"></i>
            </Link> */}

            {/* Dropdown Avatar */}
            <div className="user-dropdown">
            <button
                className="avatar-btn"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <img src={`http://localhost:3300/uploads/${userImage}`} alt="Avatar" />
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