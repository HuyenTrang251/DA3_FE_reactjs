import { Link, useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./../components/layouts/User/Header/header.scss";
import { useHideAuth } from "../contexts/HideAuthContext";

function MenuHeader()
{
    const { hideAuth } = useHideAuth(); // Lấy giá trị từ context
    const navigate = useNavigate();

    const handleGoBack = () => {
        const previousPage = sessionStorage.getItem('previousPage');
        if (previousPage) {
            navigate(previousPage);
            sessionStorage.removeItem('previousPage'); 
        }
    };

    return(
        <>
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
                    <Link className="nav-link" to="/danh-sach-lop-moi">
                        Danh sách lớp mới
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/danh-sach-gia-su">
                        Danh sách gia sư
                    </Link>
                </li>

                {/* Ẩn/hiện nút Đăng ký và Đăng nhập dựa trên trạng thái đăng nhập */}
                {!hideAuth && (
                    <>
                    <li className="nav-item ps-5">
                        <Link className="nav-link active" to="/dang-ki">
                        Đăng ký
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/dang-nhap">
                        Đăng nhập
                        </Link>
                    </li>
                    </>
                )}

                {/* Hiển thị nút Quay lại */}
                {hideAuth && (
                    <li className="nav-item ps-5">
                    <button className="nav-link btn btn-link active" onClick={handleGoBack}>
                        Quay lại
                    </button>
                    </li>
                )}
            </ul>
        </div>
        </>
    )
}
export default MenuHeader