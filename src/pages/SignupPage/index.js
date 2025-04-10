import { Link } from "react-router-dom";
import "./signup.scss";
function SignupPage(){
    return(
        <>
        <div className="containerSignUp d-flex justify-content-center align-items-center">
            <div className="card p-4" style={{ width: 500 }}>
            <h4 className="text-center mb-3" style={{color: '#0c024c'}}>ĐĂNG KÝ</h4>
            <p className="me-3 fs-5">Nhập thông tin của bạn:</p>
            <form className="d-flex">
                <div className="rdoRole">
                    <input
                    type="radio"
                    id="tutor"
                    name="role"
                    value="tutor"
                    // checked={gender === 'tutor'}
                    />
                    <label htmlFor="tutor" className="ms-2">Gia sư</label>
                </div>
                <div className="rdoRole">
                    <input
                    type="radio"
                    id="student"
                    name="role"
                    value="student"
                    // checked={gender === 'student'}
                    />
                    <label htmlFor="student" className="ms-2">Học viên</label>
                </div>
            </form>
            
            <form className="form-SignUp">
                <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Họ tên"
                    required=""
                />
                </div>
                <div className="mb-4">
                <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    required=""
                />
                </div>
                <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Số điện thoại"
                    required=""
                />
                </div>
                <div className="mb-4" style={{position: 'relative'}}>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Mật khẩu"
                    required=""
                />
                <i class="bi bi-eye" style={{position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)',cursor: 'pointer', }}></i>
                </div>
                <div className="mb-4" style={{position: 'relative'}}>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Nhập lại mật khẩu"
                    required=""
                />
                <i class="bi bi-eye" style={{position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)',cursor: 'pointer', }}></i>
                </div>
                <button className="btnDK w-100 mb-3">Đăng ký</button>
                <div className="d-flex mb-2" style={{marginLeft: '120px'}}>
                    <p className="me-3">Bạn đã có tài khoản?</p>
                    <Link to="/dang-nhap" style={{textDecoration: 'none'}}>Đăng nhập</Link>
                </div>
            </form>
            </div>
        </div>
        </>
    )
}
export default SignupPage