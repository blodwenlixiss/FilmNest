import Aside from "../aside";
import Header from "../header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      <Aside />
      <div className="flex-1 ml-0 lg:ml-56">
        <Header />
        <main className="pt-16 px-10 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
