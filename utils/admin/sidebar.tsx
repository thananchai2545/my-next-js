import {
  faChartLine,
  faUser,
  faBox,
  faBorderAll,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const menu = [
  {
    label: "Dashboard",
    icon: <FontAwesomeIcon icon={faChartLine} size="lg" />,
    link: "/admin",
  },
  {
    label: "ผู้ใช้งาน",
    icon: <FontAwesomeIcon icon={faUser} size="lg" />,
    link: "/admin/user",
  },
  {
    label: "สินค้า",
    icon: <FontAwesomeIcon icon={faBox} size="lg" />,
    link: "/admin/products",
  },
  {
    label: "หมวดหมู่สินค้า",
    icon: <FontAwesomeIcon icon={faBorderAll} size="lg" />,
    link: "/admin/category",
  },
];
