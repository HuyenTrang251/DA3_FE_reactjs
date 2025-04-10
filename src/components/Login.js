import { Link } from "react-router-dom";
import "../pages/HomePage/home.scss";

function Login() {
  return (
    <>
        <section className="sectionLogin">
        <div className="containerLogin d-flex justify-content-center align-items-center">
            <div className="card p-4" style={{ width: 600 }}>
            <img src="/image/logo_Htrang.png" alt="logo" className="mx-auto my-3" style={{width: '65px'}}/>
            <h4 className="text-center mb-3" style={{color: 'black'}}>Xin chào!</h4>
            <p className="text-center mb-5" style={{color: '#333'}}>Đăng nhập để tiếp tục</p>
            <form className="form-Login">
                <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
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
                <i class="bi bi-eye" style={{position: 'absolute', top: '50%', right: '70px', transform: 'translateY(-50%)',cursor: 'pointer', }}></i>
                </div>
                <div className="d-flex mb-4">
                <input type="checkbox" id="cbox" style={{width: '20px', marginLeft: '55px', marginRight: '10px'}}/>
                <label htmlFor="cbox">Ghi nhớ</label>
                <Link to="/quen-mat-khau" style={{marginLeft: '230px', textDecoration: 'none'}}>Quên mật khẩu? </Link>
                </div>
                <button className="btnDN mb-3">Đăng nhập</button>
                <div className="d-flex" style={{marginLeft: '150px'}}>
                    <p className="me-3">Bạn chưa có tài khoản?</p>
                    <Link to="/dang-ki" style={{textDecoration: 'none'}}>Đăng kí</Link>
                </div>
                
            </form>
            
            </div>
        </div>
        </section>
    </>
  );
}

export default Login;