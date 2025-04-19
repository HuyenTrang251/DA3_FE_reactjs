import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./sidebar.scss";
function Sidebar({ isOpen, menuItems }) {
    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);
    const userImage = localStorage.getItem("img");
    const userName = localStorage.getItem("name");

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);
    return(
        <>
        <nav className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="display-layout d-flex flex-column align-items-center mt-3">
            <img src={`http://localhost:3300/uploads/${userImage}`} alt="avatar" className="rounded-circle mb-3" style={{width:'120px', height:'120px', objectFit:'auto', padding: '10px'}}></img>
            <h5>{userName}</h5>
        </div>
        <ul className="nav-options">
            {menuItems.map((item, index) => (
            <NavLink
                to={item.path}
                key={index}
                className={`nav-option ${activePath === item.path ? "active" : ""}`}
            >
                <i className={`${item.icon} nav-img`} />
                <span className="nav-text">{item.label}</span>
            </NavLink>
            ))}
        </ul>
        </nav>
        </>
    )
}
export default Sidebar;