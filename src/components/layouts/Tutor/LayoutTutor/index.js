// import { Outlet, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import HeaderAdmin from "../HeaderAdmin";
// import {SidebarAdmin} from "../SidebarAdmin";
// import "./LayoutAdmin.scss";
// import Sidebar from "../../Sidebar";

// function LayoutTutor() {
//     const [isSidebarOpen, setSidebarOpen] = useState(true);
//     const location = useLocation();

//     useEffect(() => {
//     }, [location]);

//     const toggleSidebar = () => {
//         setSidebarOpen((prev) => !prev);
//     };
//     return (
//         <>
//         <div className="admin-layout">
//         <HeaderAdmin
//             toggleSidebar={toggleSidebar}
//             isSidebarOpen={isSidebarOpen}
//         />
//         <div className="admin-content">
//         <Sidebar isOpen={isSidebarOpen} menuItems={SidebarAdmin} />
//             <div
//             className={`main-content ${
//                 isSidebarOpen ? "with-sidebar" : "full-width"
//             }`}
//             >
//             {console.log("Outlet Rendered")}
//             <Outlet />
//             </div>
//         </div>
//         </div>
//         </>
//     )
// }
// export default LayoutTutor

import HeaderAdmin from "../../Admin/HeaderAdmin";
import {SidebarTutor} from "../SidebarTutor"; 
import LayoutUser from './../../LayoutUser/index';

function LayoutTutor() {
  return (
    <LayoutUser
      HeaderRole={HeaderAdmin}
      SidebarRole={SidebarTutor}
    />
  );
}

export default LayoutTutor;