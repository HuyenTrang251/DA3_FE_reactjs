import LayoutDefault from "../components/layouts/User/LayoutDefault";
import DichVuGiaSu from "../pages/Tutor";
import Error404 from "../pages/Error404";
import HomePage from "../pages/HomePage";
import LayoutAdmin from "../components/layouts/Admin/LayoutAdmin";
import ListTutorPage from "../pages/ListTutorPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ManageUser from "../pages/admin/ManageUser";
import ManageTutor from "../pages/admin/ManageTutor";
import ManageStudent from "../pages/admin/ManageStudent";
import Parents from "../pages/Parents";

export const routes = [
    // user
    {
      path: "/",
      element: <LayoutDefault />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
            path: "phu-huynh",
            element: <Parents />,
        },
        {
          
          path: "danh-sach-gia-su",
          element: <ListTutorPage />,
        }
      ],
    },
    // error
    {
      path: "*",
      element: <Error404 />
    },
    {
      path: "gia-su",
      element: <DichVuGiaSu />
    },
    {
      path: "dang-nhap",
      element: <LoginPage />
    },
    {
      path: "dang-ki",
      element: <SignupPage />
    },

    //admin
    {
      path: "/admin",
      element: <LayoutAdmin />,
      children: [
        {
          path: "quan-ly-nguoi-dung",
          element: <ManageUser />,
        },
        {
          path: "quan-ly-gia-su",
          element: <ManageTutor />,
        },
        {
          path: "quan-ly-hoc-vien",
          element: <ManageStudent />,
        }
      ],
    },
  ];