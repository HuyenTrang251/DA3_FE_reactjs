import LayoutDefault from "../components/layouts/User/LayoutDefault";
import DichVuGiaSu from "../pages/user/Tutor_Math";
import Error404 from "../pages/Error404";
import HomePage from "../pages/HomePage";
import LayoutAdmin from "../components/layouts/Admin/LayoutAdmin";
import ListTutorPage from "../pages/ListTutorPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ManageUser from "../pages/admin/ManageUser";
import ManageTutor from "../pages/admin/ManageTutor";
import ManageStudent from "../pages/admin/ManageStudent";
import ListNewClassPage from "../pages/ListNewClassPage";
// import Profile from "../pages/tutor/Profile";
import LayoutTutor from "../components/layouts/Tutor/LayoutTutor";
import LayoutStudent from "../components/layouts/Student/LayoutStudent";
import ManagePost from "../pages/student/ManagePost";

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
          path: "danh-sach-lop-moi",
          element: <ListNewClassPage />
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
    {
      path: "danh-sach-gia-su",
      element: <ListTutorPage />,
    },
    {
      path: "danh-sach-lop-moi",
      element: <ListNewClassPage />,
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

    //tutor
    {
      path: "/tutor",
      element: <LayoutTutor />,
      children: [
        
        // {
        //   path: "thong-tin-ca-nhan",
        //   element: <Profile />,
        // },
        // {
        //   path: "quan-ly-lop",
        //   element: <ManageClass />,
        // },
        // {
        //   path: "quan-ly-phan-hoi",
        //   element: <ManageResponse />,
        // },
        // {
        //   path: "quan-ly-danh-gia",
        //   element: <ManageCommen />,
        // },
      ],
    },
    {
      path: "/student",
      element: <LayoutStudent />,
      children: [
        
        {
          path: "quan-ly-bai-dang",
          element: <ManagePost />
        }
      ]
    }
  ];