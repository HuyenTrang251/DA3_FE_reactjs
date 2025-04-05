import { useRoutes } from "react-router-dom";
import { routes } from "../../routes";

function Routers() {
  const element = useRoutes(routes);
  return <>{element}</>;
}

export default Routers;