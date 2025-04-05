import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Header/header.scss";
function Header() {
    return (
        <>
            <nav className="navbar headercss navbar-expand-lg navbar-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src="/image/logo_Htrang.png" alt="logo" />
                        HTrang.vn
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
                                <Link className="nav-link active" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/phuHuynh">
                                    Phụ huynh
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/tim-lop-day-kem">
                                    Tìm Lớp Dạy Kèm
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/tim-gia-su">
                                    Tìm Gia Sư
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
                                    More
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/action">
                                            Action
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/another-action">
                                            Another action
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header