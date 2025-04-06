import { Link } from "react-router-dom"


function CardTutor(){
    return (
    <>
        <div className="col-md-3 col-sm-6 col-12 mb-4">
            <div className="card">
                <img className="card-img-top" src="/image/sinhvien.jpg" alt="image"/>
                <div className="card-body">
                <h4 className="card-title">Nguyễn Trà My</h4>
                <p className="card-text">Hà Nội | Toán, Tiếng việt</p>
                <p className="card-text">200.000đ/ buổi</p>
                <p className="card-text">Đại học năm 2 - Chuyên ngành Giáo dục tiểu học - Sư phạm Tiếng Anh - Trường Đại học Sư phạm Hà Nội</p>
                <div className="d-flex justify-content-center"><Link to="#" class="btn btn-primary" style={{margin: '0px auto'}}>Mời dạy </Link></div>
                </div>
            </div>
        </div>
    </>
    )
}
export default CardTutor