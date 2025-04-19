import HeaderAdmin from "../../Admin/HeaderAdmin";
import {SidebarStudent} from "../SidebarStudent"; 
import LayoutUser from './../../LayoutUser/index';

function LayoutStudent() {
  return (
    <LayoutUser
      HeaderRole={HeaderAdmin}
      SidebarRole={SidebarStudent}
    />
  );
}

export default LayoutStudent;