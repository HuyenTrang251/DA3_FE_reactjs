import { Link } from "react-router-dom"

function TrangChu() {
    return(
        <>
            <div className="header-content">
                <h1>Gia Sư Online – Dạy Kèm Trực Tuyến</h1>
                <p>
                    Giasuonline.vn – Nền tảng kết nối gia sư online và tìm kiếm lớp dạy kèm
                    trực tuyến dành cho phụ huynh và học sinh.
                </p>
                <Link className="btn btn-danger" to="/tim-gia-su-theo-lop">
                    Tìm Gia Sư Theo Lớp
                </Link>
                <Link className="btn btn-danger" to="/dang-ky-lam-gia-su">
                    Đăng Ký Làm Gia Sư
                </Link>
            </div>
        </>
    )
}

export default TrangChu