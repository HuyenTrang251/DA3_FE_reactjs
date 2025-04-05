import LayoutDefault from "../components/layouts/LayoutDefault";
import DichVuGiaSu from "../pages/GiaSu";
import Error404 from "../pages/Error404";
import TrangChu from "../pages/TrangChu";
import PhuHuynh from "../pages/PhuHuynh";

export const routes = [
    // user
    {
      path: "/",
      element: <LayoutDefault />,
      children: [
        {
          path: "/",
          element: <TrangChu />,
        },
        {
            path: "phuHuynh",
            element: <PhuHuynh />,
        },
        
      ],
    },
    // error
    {
      path: "*",
      element: <Error404 />,
    },

    {
        path: "giasu",
        element: <DichVuGiaSu />,
    }
  ];