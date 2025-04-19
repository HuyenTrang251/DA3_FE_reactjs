import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./listTutor.scss"
import { getAllTutors } from "../../services/TutorService";
function ListTutorPage() {
    // const tutors = [
    //     {
    //         name: "Nguyễn Thị Bích Ngân",
    //         location: "Hà Nội",
    //         subjects: "Hóa, Tiếng Anh",
    //         price: "200,000 vnd/buổi",
    //         description: "Đại học năm 2 - Chuyên ngành Quan hệ Quốc tế - Trường Học",
    //         image: "https://storage.googleapis.com/a1aa/image/AcIOqeyIBH249XaMMBMo62usn-8xZ5IrBfamEEx158c.jpg"
    //     },
    //     {
    //         name: "Bao Uyen",
    //         location: "Hà Nội",
    //         subjects: "Văn, Tiếng Việt, Toán + Tiếng Việt",
    //         price: "200,000 vnd/buổi",
    //         description: "Tốt nghiệp Đại học - Chuyên ngành Tư tưởng Hồ Chí Minh -",
    //         image: "https://storage.googleapis.com/a1aa/image/Y5XnKnAX74PF_diZzxH6EbdaFNeHPl08SmpVt4XxfKQ.jpg"
    //     },
    //     {
    //         name: "Đặng Lan Anh",
    //         location: "Hà Nội",
    //         subjects: "Tiếng Việt",
    //         price: "120 vnd/buổi",
    //         description: "Đại học năm 1 - Chuyên ngành Công nghệ thông tin - Trường Đại",
    //         image: "https://storage.googleapis.com/a1aa/image/wkVXbBRiVyV7vVeUyXjJJgRsRaeAcBwFZ6gvU8ymtN8.jpg"
    //     },
    //     {
    //         name: "Trương Thúy Vy",
    //         location: "Hồ Chí Minh",
    //         subjects: "Toán + Tiếng Việt, Luyện chữ, Tiếng Anh",
    //         price: "200,000 vnd/buổi",
    //         description: "Đại học năm 2 - Chuyên ngành Toán ứng dụng - Trường Đại học",
    //         image: "https://storage.googleapis.com/a1aa/image/PdbPWeCEtIxpV9MgcUqBn667SerxnSxlnl53b46NJlg.jpg"
    //     },
    //     {
    //         name: "Nguyễn Thị Bích Ngân",
    //         location: "Hà Nội",
    //         subjects: "Hóa, Tiếng Anh",
    //         price: "200,000 vnd/buổi",
    //         description: "Đại học năm 2 - Chuyên ngành Quan hệ Quốc tế - Trường Học",
    //         image: "https://storage.googleapis.com/a1aa/image/AcIOqeyIBH249XaMMBMo62usn-8xZ5IrBfamEEx158c.jpg"
    //     },
    //     {
    //         name: "Bao Uyen",
    //         location: "Hà Nội",
    //         subjects: "Văn, Tiếng Việt, Toán + Tiếng Việt",
    //         price: "200,000 vnd/buổi",
    //         description: "Tốt nghiệp Đại học - Chuyên ngành Tư tưởng Hồ Chí Minh -",
    //         image: "https://storage.googleapis.com/a1aa/image/Y5XnKnAX74PF_diZzxH6EbdaFNeHPl08SmpVt4XxfKQ.jpg"
    //     },
    //     {
    //         name: "Đặng Lan Anh",
    //         location: "Hà Nội",
    //         subjects: "Tiếng Việt",
    //         price: "120 vnd/buổi",
    //         description: "Đại học năm 1 - Chuyên ngành Công nghệ thông tin - Trường Đại",
    //         image: "https://storage.googleapis.com/a1aa/image/wkVXbBRiVyV7vVeUyXjJJgRsRaeAcBwFZ6gvU8ymtN8.jpg"
    //     },
    //     {
    //         name: "Trương Thúy Vy",
    //         location: "Hồ Chí Minh",
    //         subjects: "Toán + Tiếng Việt, Luyện chữ, Tiếng Anh",
    //         price: "200,000 vnd/buổi",
    //         description: "Đại học năm 2 - Chuyên ngành Toán ứng dụng - Trường Đại học",
    //         image: "https://storage.googleapis.com/a1aa/image/PdbPWeCEtIxpV9MgcUqBn667SerxnSxlnl53b46NJlg.jpg"
    //     }
    // ];

    const [tutors, setTutors] = useState([]);
    useEffect(() => {
        const fetchTutors = async () => {
        try {
            const data = await getAllTutors();
            // Truy cập vào phần tử đầu tiên của mảng kết quả (danh sách gia sư)
            if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
                setTutors(data[0]);
            } else {
                console.error("Dữ liệu trả về từ API không đúng định dạng:", data);
                setTutors([]); // Đặt state tutors về mảng rỗng để tránh lỗi render
            }
        } catch (error) {
            console.error("Lỗi khi gọi API lấy danh sách gia sư:", error);
        }
        };

        fetchTutors();
    }, []);

    const [tinh, setTinh] = useState([]);
        const [huyen, setHuyen] = useState([]);
        const [selectedTinh, setSelectedTinh] = useState("");
        const [selectedHuyen, setSelectedHuyen] = useState("");
    
        useEffect(() => {
        fetch("https://provinces.open-api.vn/api/?depth=1")
            .then((res) => res.json())
            .then((data) => setTinh(data))
            .catch((error) => console.log("Lỗi gọi tỉnh: ", error));
        }, []);
    
        useEffect(() => {
        if (selectedTinh) {
            fetch(`https://provinces.open-api.vn/api/p/${selectedTinh}?depth=2`)
            .then((res) => res.json())
            .then((data) => setHuyen(data.districts))
            .catch((error) => console.log("Lỗi gọi huyện: ", error));
        } else {
            setHuyen([]);
        }
        }, [selectedTinh]);

    return (
        <div className="container list-tutor">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold">DANH SÁCH GIA SƯ</h5>
                <span className="text-muted">Có {tutors.length} kết quả</span>
            </div>
            <div className="mb-3">
                <div className="class-content d-flex gap-3">
                    <select className="form-class form-select form-select-sm" 
                        value={selectedTinh}
                        onChange={(e) => setSelectedTinh(e.target.value)}>
                    <option>-- Chọn địa điểm --</option>
                    {tinh.map((t) => (
                        <option key={t.code} value={t.code}>
                        {t.name}
                        </option>
                    ))}
                    </select>
                    <select className="form-class form-select form-select-sm" 
                        value={selectedHuyen}
                        onChange={(e) => setSelectedHuyen(e.target.value)}
                        // disabled={!selectedTinh}
                    >
                    <option>-- Quận/Huyện --</option>
                    {huyen.map((h) => (
                        <option key={h.code} value={h.code}>
                        {h.name}
                        </option>
                    ))}
                    </select>
                    <select className="form-class form-select form-select-sm">
                    <option>-- Chọn môn học --</option>
                    </select>
                    <select className="form-class form-select form-select-sm">
                    <option>-- Chọn chủ đề --</option>
                    </select>
                    <select className="form-class form-select form-select-sm">
                    <option>-- Hình thức dạy --</option>
                    </select>
                    <button className="btn btn-primary">Áp dụng</button>
                </div>
            </div>
            <div className="row">
                {tutors.map((tutor) => (
                    <div key={tutor.id_tutor} className="col-md-3 col-sm-6 col-12 mb-4">
                    <div className="card">
                        <img className="card-img-top" style={{maxHeight: '250px', objectFit: 'contain'}} src={tutor.img ? `http://localhost:3300/uploads/${tutor.img}` : "/image/avatar.jpg"} alt={tutor.full_name} />
                        <div className="card-body">
                        <h4 className="card-title">{tutor.full_name}</h4>
                        <p className="card-text">{tutor.address || "Chưa cập nhật"} | {tutor.subjects_list || "Chưa cập nhật"}</p> 
                        <p className="card-text">{tutor.tuition ? `${Number(tutor.tuition).toLocaleString('vi-VN')}đ/ buổi` : "Chưa cập nhật học phí"}</p>
                        <p className="card-text">{tutor.experience ? tutor.experience : "Chưa có kinh nghiệm"}</p> 
                        <div className="d-flex justify-content-center">
                            <Link to={`/tutor/${tutor.id_tutor}`} className="btn btn-primary" style={{ margin: '0px auto' }}>Mời dạy</Link> 
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ListTutorPage