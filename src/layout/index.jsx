import { Outlet } from "react-router-dom";
import bg from "../assets/bg.png";

export const Layout = () => {
  return (
    <div className="w100 h100 df fdc aic p-r">
      <Outlet />
      <img src={bg} alt="background" className="bg" />
    </div>
  );
};
