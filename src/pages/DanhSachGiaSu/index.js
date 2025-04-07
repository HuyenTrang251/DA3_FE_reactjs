import { Link } from "react-router-dom";
import "./dsGs.scss"
function DanhSachGiaSu() {
    const tutors = [
        {
            name: "Nguyễn Thị Bích Ngân",
            location: "Hà Nội",
            subjects: "Hóa, Tiếng Anh",
            price: "200,000 vnd/buổi",
            description: "Đại học năm 2 - Chuyên ngành Quan hệ Quốc tế - Trường Học",
            image: "https://storage.googleapis.com/a1aa/image/AcIOqeyIBH249XaMMBMo62usn-8xZ5IrBfamEEx158c.jpg"
        },
        {
            name: "Bao Uyen",
            location: "Hà Nội",
            subjects: "Văn, Tiếng Việt, Toán + Tiếng Việt",
            price: "200,000 vnd/buổi",
            description: "Tốt nghiệp Đại học - Chuyên ngành Tư tưởng Hồ Chí Minh -",
            image: "https://storage.googleapis.com/a1aa/image/Y5XnKnAX74PF_diZzxH6EbdaFNeHPl08SmpVt4XxfKQ.jpg"
        },
        {
            name: "Đặng Lan Anh",
            location: "Hà Nội",
            subjects: "Tiếng Việt",
            price: "120 vnd/buổi",
            description: "Đại học năm 1 - Chuyên ngành Công nghệ thông tin - Trường Đại",
            image: "https://storage.googleapis.com/a1aa/image/wkVXbBRiVyV7vVeUyXjJJgRsRaeAcBwFZ6gvU8ymtN8.jpg"
        },
        {
            name: "Trương Thúy Vy",
            location: "Hồ Chí Minh",
            subjects: "Toán + Tiếng Việt, Luyện chữ, Tiếng Anh",
            price: "200,000 vnd/buổi",
            description: "Đại học năm 2 - Chuyên ngành Toán ứng dụng - Trường Đại học",
            image: "https://storage.googleapis.com/a1aa/image/PdbPWeCEtIxpV9MgcUqBn667SerxnSxlnl53b46NJlg.jpg"
        },
        {
            name: "Nguyễn Thị Bích Ngân",
            location: "Hà Nội",
            subjects: "Hóa, Tiếng Anh",
            price: "200,000 vnd/buổi",
            description: "Đại học năm 2 - Chuyên ngành Quan hệ Quốc tế - Trường Học",
            image: "https://storage.googleapis.com/a1aa/image/AcIOqeyIBH249XaMMBMo62usn-8xZ5IrBfamEEx158c.jpg"
        },
        {
            name: "Bao Uyen",
            location: "Hà Nội",
            subjects: "Văn, Tiếng Việt, Toán + Tiếng Việt",
            price: "200,000 vnd/buổi",
            description: "Tốt nghiệp Đại học - Chuyên ngành Tư tưởng Hồ Chí Minh -",
            image: "https://storage.googleapis.com/a1aa/image/Y5XnKnAX74PF_diZzxH6EbdaFNeHPl08SmpVt4XxfKQ.jpg"
        },
        {
            name: "Đặng Lan Anh",
            location: "Hà Nội",
            subjects: "Tiếng Việt",
            price: "120 vnd/buổi",
            description: "Đại học năm 1 - Chuyên ngành Công nghệ thông tin - Trường Đại",
            image: "https://storage.googleapis.com/a1aa/image/wkVXbBRiVyV7vVeUyXjJJgRsRaeAcBwFZ6gvU8ymtN8.jpg"
        },
        {
            name: "Trương Thúy Vy",
            location: "Hồ Chí Minh",
            subjects: "Toán + Tiếng Việt, Luyện chữ, Tiếng Anh",
            price: "200,000 vnd/buổi",
            description: "Đại học năm 2 - Chuyên ngành Toán ứng dụng - Trường Đại học",
            image: "https://storage.googleapis.com/a1aa/image/PdbPWeCEtIxpV9MgcUqBn667SerxnSxlnl53b46NJlg.jpg"
        }
    ];

    return (
        <div className="container list-giasu">
            <div className="headerDsGS d-flex">
                <h3 className="pt-4"><i className="fas fa-chalkboard-teacher"></i> DANH SÁCH GIA SƯ</h3>
                <p className="ms-3 pt-4" style={{color: '#333', marginTop: '10px'}}>có 10 kết quả</p>
            </div>
            <div className="row my-5">
                <div className="col-md-2 filter-select">
                    <select className="form-select">
                        <option>-- Chọn địa điểm --</option>
                    </select>
                </div>
                <div className="col-md-2 filter-select">
                    <select className="form-select">
                        <option>-- Quận huyện --</option>
                    </select>
                </div>
                <div className="col-md-2 filter-select">
                    <select className="form-select">
                        <option>-- Chọn môn học --</option>
                    </select>
                </div>
                <div className="col-md-2 filter-select">
                    <select className="form-select">
                        <option>-- Chọn chủ đề --</option>
                    </select>
                </div>
                <div className="col-md-2 filter-select">
                    <select className="form-select">
                        <option>-- Đối tượng dạy --</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary w-100">Áp dụng</button>
                </div>
            </div>
            <div className="row">
                {tutors.map((tutor, index) => (
                    <div className="col-md-3 mb-5" key={index}>
                        <div className="card card-info">
                            <img src={tutor.image} className="card-img-top" alt={`Portrait of ${tutor.name}`} />
                            <div className="card-body">
                                <h5 className="card-title">{tutor.name}</h5>
                                <p className="card-text">{tutor.location} | {tutor.subjects}</p>
                                <p className="card-text">{tutor.price}</p>
                                <p className="card-text">{tutor.description}</p>
                                <div className="d-flex justify-content-center mt-4"><Link to="#" className="btn btn-custom">Mời dạy</Link></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default DanhSachGiaSu