import logo from "../../assets/logo.png";
import calendar from "@/assets/calendar.png";
import checkmark from "@/assets/checkmark.png";
import loading from "@/assets/loading.png";
import RandomMovie from "./randomMovie";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Aside = () => {
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <aside className="hidden lg:block fixed top-0 left-0 h-screen w-86 border-r-2 z-50 pt-6">
        <div>
          <NavLink className="mr-4 flex justify-center items-center" to="/">
            <img className="w-20" src={logo} alt="logo" />
            <h1 className="text-2xl font-bold">FilmNest</h1>
          </NavLink>
        </div>
        <nav className="flex flex-col gap-3 px-4">
          <ul className="pb-6 space-y-3 font-semibold border-b-2">
            <li className="group hover:bg-red-600 hover:text-white rounded-xl p-2 cursor-pointer">
              <NavLink className="flex gap-1" to="/planned">
                <img className="icon-image w-5 h-5" src={calendar} alt="" />
                {t("Planned")}
              </NavLink>
            </li>
            <li className="group hover:bg-red-600 hover:text-white rounded-xl p-2 cursor-pointer">
              <NavLink className="flex gap-1" to="/in-progress">
                <img className="icon-image w-5 h-5" src={loading} alt="" />
                {t("InProgress")}
              </NavLink>
            </li>
            <li className="group hover:bg-red-600 hover:text-white rounded-xl p-2 cursor-pointer">
              <NavLink className="flex gap-1" to="/watched">
                <img className="icon-image w-5 h-5" src={checkmark} alt="" />
                {t("Watched")}
              </NavLink>
            </li>
          </ul>
        </nav>
        <RandomMovie />
      </aside>
      <button
        className="lg:hidden fixed top-4 left-4 z-40 p-3 bg-red-600 text-white rounded-full shadow-lg"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <div
        className={`fixed z-50 top-0 left-0 h-screen bg-opacity-60 bg-black w-full transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <aside
          className={`fixed top-0 left-0 h-screen bg-background w-64 z-10 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 border-r-2 pt-8`}
        >
          <div className="flex justify-between items-center px-5">
            <NavLink className="flex justify-center items-center" to="/">
              <img className="w-20" src={logo} alt="logo" />
              <h1 className="text-2xl font-bold">FilmNest</h1>
            </NavLink>
            <button
              className="text-foreground"
              onClick={() => setIsSidebarOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-4 px-5">
            <ul className="pb-8 space-y-4 font-bold border-b-2">
              <li className="group hover:bg-red-600 hover:text-white rounded-xl p-2 cursor-pointer">
                <NavLink
                  className="flex gap-2"
                  to="/planned"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <img className="icon-image w-5 h-5" src={calendar} alt="" />
                  {t("Planned")}
                </NavLink>
              </li>
              <li className="group hover:bg-red-600 hover:text-white rounded-xl p-2 cursor-pointer">
                <NavLink
                  className="flex gap-2"
                  to="/in-progress"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <img className="icon-image w-5 h-5" src={loading} alt="" />
                  {t("InProgress")}
                </NavLink>
              </li>
              <li className="group hover:bg-red-600 hover:text-white rounded-xl p-2 cursor-pointer">
                <NavLink
                  className="flex gap-2"
                  to="/watched"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <img className="icon-image w-5 h-5" src={checkmark} alt="" />
                  {t("Watched")}
                </NavLink>
              </li>
            </ul>
          </nav>
          <RandomMovie />
        </aside>
      </div>
    </>
  );
};

export default Aside;
