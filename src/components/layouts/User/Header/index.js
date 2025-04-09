import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./header.scss";
import './../../../../pages/TrangChu/trangChu.scss';
function Header() {
    return (
        <>
            <nav className="navbar headercss navbar-expand-lg navbar-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/" style={{color: '#0c024c'}}>
                        <img src="/image/logo_Htrang.png" alt="logo" />
                        HTrang
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Trang chủ
                                </Link>
                            </li>
                            
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Dịch vụ gia sư
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/action">
                                            Gia sư môn Tiếng Anh
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/action">
                                            Gia sư môn Toán
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/another-action">
                                            Gia sư môn Văn
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/action">
                                            Gia sư môn Lý
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/action">
                                            Gia sư môn Hoá
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/action">
                                            Gia sư Tiểu học
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Phụ huynh
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/action">
                                            Kinh nghiệm tìm gia sư
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/action">
                                            Học phí tham khảo
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Gia sư
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/action">
                                            Nội quy nhận lớp
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/action">
                                            Hướng dẫn thanh toán
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/another-action">
                                            Gia sư khiếu nại
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/action">
                                            Những lưu ý quan trọng
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            
                            <li className="nav-item">
                                <Link className="nav-link" to="/tim-lop-day-kem">
                                    Danh sách lớp mới
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/tim-gia-su">
                                    Danh sách Gia Sư
                                </Link>
                            </li>
                            <li className="nav-item ps-5">
                                <Link className="nav-link active" to="/giaSu">
                                    Đăng ký
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/dangNhap">
                                    Đăng nhập
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header