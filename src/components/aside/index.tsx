import logo from "../../assets/logo.png";
import calendar from "@/assets/calendar.png";
import checkmark from "@/assets/checkmark.png";
import loading from "@/assets/loading.png";
import RandomMovie from "./randomMovie";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Aside = () => {
  const { t } = useTranslation();

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 border-r-2 z-50 pt-8">
      <div>
        <NavLink className="mr-8 flex justify-center items-center" to="/">
          <img className="w-24" src={logo} alt="logo" />
          <h1 className="text-3xl font-bold">FilmNest</h1>
        </NavLink>
      </div>
      <nav className="flex flex-col gap-4 px-5">
        <ul className="pb-8 space-y-4 font-bold border-b-2">
          <li className="group hover:bg-red-600 hover:text-white rounded-xl p-2 cursor-pointer">
            <NavLink className="flex gap-2" to="/planned">
              <img className="icon-image" src={calendar} alt="" />
              {t("Planned")}
            </NavLink>
          </li>
          <li className="group hover:bg-red-600 hover:text-white rounded-xl p-2 cursor-pointer">
            <NavLink className="flex gap-2" to="/in-progress">
              <img className="icon-image" src={loading} alt="" />
              {t("InProgress")}
            </NavLink>
          </li>
          <li className="group hover:bg-red-600 hover:text-white rounded-xl p-2 cursor-pointer">
            <NavLink className="flex gap-2" to="/watched">
              <img className="icon-image" src={checkmark} alt="" />
              {t("Watched")}
            </NavLink>
          </li>
        </ul>
      </nav>
      <RandomMovie />
    </aside>
  );
};

export default Aside;
