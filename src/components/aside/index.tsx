import logo from "../../assets/dad9d108-d49d-4563-9d5b-2f5bda9b73ce-fotor-bg-remover-2025011523533.png";
import RandomMovie from "./randomMovie";
import { NavLink } from "react-router-dom";

const Aside = () => {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 border-r-2 z-50 pt-8 ">
      <div>
        <NavLink className="mr-8 flex justify-center items-center" to="/">
          <img className="w-24" src={logo} alt="logo" />
          <h1 className="text-3xl font-bold">FilmNest</h1>
        </NavLink>
      </div>
      <nav className="flex flex-col gap-4 px-5">
        <ul className="pb-8 space-y-4 font-bold border-b-2 ">
          <li className="hover:bg-red-600 hover:text-white rounded-xl p-2 cursor-pointer">
            <NavLink to="/planned">Planned</NavLink>
          </li>
          <li className="hover:bg-red-600 hover:text-white rounded-xl p-2 cursor-pointer">
            <NavLink to="/in-progress">In Progress</NavLink>
          </li>
          <li className="hover:bg-red-600 hover:text-white rounded-xl p-2 cursor-pointer">
            <NavLink to="/watched">Watched</NavLink>
          </li>
        </ul>
      </nav>
      <RandomMovie />
    </aside>
  );
};

export default Aside;
