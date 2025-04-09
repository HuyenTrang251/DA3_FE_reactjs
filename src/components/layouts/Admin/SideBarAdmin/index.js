import { NavLink, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./SidebarAdmin.scss";
import { useEffect, useState } from "react";
function SidebarAdmin({ isOpen }) {
    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);
    const menuItems = [
        {
        icon: "bi bi-person-circle",
        label: "Quản lý người dùng",
        path: "/admin/quanlynguoidung",
        },
        {
        icon: "bi bi-person-vcard",
        label: "Quản lý gia sư",
        path: "/admin/quanlygiasu",
        },
        {
        icon: "bi bi-person-square",
        label: "Quản lý học viên",
        path: "/admin/quanlyhocvien",
        },
        {
        icon: "bi bi-file-earmark-post",
        label: "Quản lý bài đăng",
        path: "/admin/quanlybaidang",
        },
        {
        icon: "bi bi-file-earmark-check-fill",
        label: "Quản lý đặt lịch",
        path: "/admin/quanlydatlich",
        },
        {
        icon: "bi bi-chat-right-quote-fill",
        label: "Quản lý phản hồi",
        path: "/admin/quanlyphanhoi",
        },
        {
        icon: "bi bi-twitch",
        label: "Quản lý đánh giá",
        path: "/admin/quanlydanhgia",
        },
        {
        icon: "bi bi-bar-chart-line-fill",
        label: "Tổng quan hệ thống",
        path: "/admin/tong-quan",
        },
    ];
    return (
        <>
        <nav className={`sidebar ${isOpen ? "open" : "closed"}`}>
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
export default SidebarAdmin