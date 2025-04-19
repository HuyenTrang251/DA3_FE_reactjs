import React, { useEffect, useState } from "react";
import { Container, Card, Col, Row, Button } from "react-bootstrap";
import "./listClass.scss";
import { getPostsApproved, searchPosts } from "../../services/PostService";

function ListNewClassPage() {
    // const classs = [
    //     {
    //         id: 3,
    //         avatar: 'https://storage.googleapis.com/a1aa/image/wkVXbBRiVyV7vVeUyXjJJgRsRaeAcBwFZ6gvU8ymtN8.jpg',
    //         name: 'Gia sư Bình Minh',
    //         date: '10/04/2025',
    //         title: 'Toán 12 - 375k/3h, 1b/tuần - Vinhome Smartcity Nam Từ Liêm',
    //         description: 'Học sinh nam lực học khoảng 6-7đ, tiếp thu tốt nhưng do bố bé bận nên không kiến thức thực, mục tiêu thi ĐH 8+',
    //         price: '1,500,000',
    //         lessonsPerWeek: '1/6 đề nghị',
    //         discountedPrice: '610,000 vnđ',
    //         discountText: 'Hỗ trợ 70% phí',
    //         actionButtonText: 'Đề nghị dạy'
    //         },
    // ];

    const [posts, setPosts] = useState([]);
    const [tinh, setTinh] = useState([]);
    const [huyen, setHuyen] = useState([]);
    const [selectedTinh, setSelectedTinh] = useState("");
    const [selectedHuyen, setSelectedHuyen] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedMethod, setSelectedMethod] = useState("");
    const [selectedAudience, setSelectedAudience] = useState("");
    const [subjects, setSubjects] = useState([]); // Cần fetch từ API
    const [methods] = useState(["online", "offline"]);
    const [audiences] = useState(["giáo viên", "sinh viên"]);


    useEffect(() => {
        const fetchPosts = async () => {
        try {
            const data = await getPostsApproved();
            if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
                setPosts(data[0]);
            } else {
                console.error("Dữ liệu trả về từ API không đúng định dạng:", data);
                setPosts([]);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API lấy danh sách lớp mới", error);
        }
        };
        fetchPosts();
    }, []);

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

    // API lấy danh sách môn học
    useEffect(() => {
        const fetchSubjects = async () => {
          try {
            // const response = await fetch('/api/subjects');
            // const data = await response.json();
            setSubjects(["Toán", "Lý", "Hóa", "Văn", "Tiếng Anh", "Tiếng Trung"]); // Thay thế bằng API thực tế
          } catch (error) {
            console.error("Lỗi khi gọi API lấy danh sách môn học:", error);
          }
        };
        fetchSubjects();
    }, []);

    const handleSearchPosts = async () => {
        try {
            const data = await searchPosts(
                selectedTinh || null,
                selectedHuyen || null,
                selectedSubject || null,
                selectedMethod || null,
                selectedAudience || null
            );
    
          if (Array.isArray(data) && data.length > 0) {
                setPosts(data[0]);
          } else {
                setPosts([]);
                console.log("Không tìm thấy kết quả nào.");
          }
        } catch (error) {
            console.error("Lỗi khi gọi API tìm kiếm:", error);
            setPosts([]);
        }
    };

    return (
    <>
        <Container className="mt-4 text-black">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold">DANH SÁCH LỚP MỚI</h5>
            <span className="text-muted">Có {posts.length} kết quả</span>
        </div>
        <div className="mb-3">
            <div className="class-content d-flex gap-3">
                <select
                className="form-class form-select form-select-sm"
                value={selectedTinh}
                onChange={(e) => setSelectedTinh(e.target.value)}
                >
                <option>-- Chọn địa điểm --</option>
                {tinh.map((t) => (
                    <option key={t.code} value={t.name.replace(/^Thành phố\s|^Tỉnh\s/, '')}>
                        {t.name}
                    </option>
                ))}
                </select>
                <select
                className="form-class form-select form-select-sm"
                value={selectedHuyen}
                onChange={(e) => setSelectedHuyen(e.target.value)}
                // disabled={!selectedTinh}
                >
                <option>-- Quận/Huyện --</option>
                {huyen.map((h) => (
                    <option key={h.code} value={h.name}>
                        {h.name}
                    </option>
                ))}
                </select>
                <select className="form-class form-select form-select-sm"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject
                        (e.target.value)}
                >
                <option value="">-- Chọn môn học --</option>
                {subjects.map((subject, index) => (
                    <option key={index} value={subject}>
                        {subject}
                    </option>
                ))}
                </select>
                <select className="form-class form-select form-select-sm"
                    value={selectedMethod}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                >
                <option value="">-- Hình thức dạy --</option>
                {methods.map((method) => (
                    <option key={method} value={method}>
                        {method}
                    </option>
                ))}
                </select>
                <select
                className="form-class form-select form-select-sm"
                value={selectedAudience}
                onChange={(e) => setSelectedAudience(e.target.value)}
                >
                <option value="">-- Chọn đối tượng --</option>
                {audiences.map((audience) => (
                    <option key={audience} value={audience}>
                        {audience}
                    </option>
                ))}
                </select>
                <button className="btn btn-primary" onClick={handleSearchPosts}>Áp dụng</button>
            </div>
        </div>
        <div className="mb-2">
            <Row className="g-0 bg-light rounded p-2 d-none d-md-flex">
                <Col md={2} className="text-class text-center">
                Người đăng
                </Col>
                <Col md={6} className="text-class">
                Nội dung lớp học tìm gia sư
                </Col>
                <Col md={2} className="text-class text-center">
                Học phí đề nghị
                </Col>
                <Col md={2} className="text-class text-center">
                Phí nhận lớp
                </Col>
            </Row>
        </div>
        {posts.map((post) => (
            <Card key={post.id_post} className="mb-3">
            <Card.Body className="p-3">
                <Row className="align-items-center">
                    <Col md={2} className="text-center">
                        <div className="d-flex flex-column align-items-center">
                            <img
                            src={`http://localhost:3300/uploads/${post.user_img}`}
                            alt={post.full_name}
                            className="rounded-circle mb-2"
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            />
                            <div className="fw-bold text-primary">{post.full_name}</div>
                            <small className="text-muted">
                            {new Date(post.created_at).toLocaleDateString()}
                            </small>
                        </div>
                    </Col>
                    <Col md={6}>
                        <h6 className="mb-2 fw-bold text-primary">
                                {post.subject} - {post.class} - {parseFloat(post.tuition).toLocaleString('vi-VN')}/buổi - {post.address}
                        </h6>
                        <p className="mb-2" style={{ fontSize: "1rem" }}>
                                {post.notes}
                        </p>
                        <div>
                            <span
                            className="badge bg-light text-success me-1"
                            style={{ fontSize: "1rem" }}
                            >
                            {post.method}
                            </span>
                            {post.audience && (
                            <span
                                className="badge bg-light text-info me-1"
                                style={{ fontSize: "1rem" }}
                            >
                                {post.audience}
                            </span>
                            )}
                        </div>
                    </Col>
                    <Col md={2} className="text-center">
                        <div className="mb-2">
                            <span className="fw-bold">
                            {parseFloat(post.tuition * post.sessions_per_week * 4).toLocaleString("vi-VN")}
                            </span>{" "}
                            <small>/tháng</small>
                        </div>
                        <small className="text-muted">
                            {post.sessions_per_week} buổi/tuần, {post.hours_per_session} giờ/buổi
                        </small>
                    </Col>
                    <Col md={2} className="text-center">
                        <div className="mb-2">
                            <span className="fw-bold">{parseFloat(post.fee_receive).toLocaleString("vi-VN")}</span>
                        </div>
                        <small className="text-success">{post.support_debt_percentage}</small>
                        <div className="mt-2">
                            <Button style={{ backgroundColor: "#10B1ff" }} size="sm">
                            Đề nghị dạy
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
            </Card>
        ))}
        <div></div>
      </Container>
    </>
  );
}

export default ListNewClassPage;