import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react";
import { getAllTutors } from "../services/TutorService";
function CardTutor(){
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
    return (
    <>
        <div className="row">
        {tutors.filter((tutor) => tutor.img).map((tutor) => (
            <div key={tutor.id_tutor} className="col-md-3 col-sm-6 col-12 mb-4">
            <div className="card">
                <img className="card-img-top" style={{maxHeight: '300px'}} src={tutor.img ? `http://localhost:3300/uploads/${tutor.img}` : "/image/gs.jpg"} alt={tutor.full_name} />
                <div className="card-body">
                <h4 className="card-title">{tutor.full_name}</h4>
                <p className="card-text">{tutor.address || "Chưa cập nhật"} | {tutor.subjects_list || "Chưa cập nhật"}</p> 
                <p className="card-text">{tutor.tuition ? `${Number(tutor.tuition).toLocaleString('vi-VN')}đ/ buổi` : "Chưa cập nhật học phí"}</p>
                <p className="card-text">{tutor.experience ? tutor.experience.substring(0, 150) + "..." : "Chưa có kinh nghiệm"}</p> 
                <div className="d-flex justify-content-center">
                    <Link to={`/tutor/${tutor.id_tutor}`} className="btn btn-primary" style={{ margin: '0px auto' }}>Xem chi tiết</Link> 
                </div>
                </div>
            </div>
            </div>
        ))}
        </div>
    </>
    )
}
export default CardTutor