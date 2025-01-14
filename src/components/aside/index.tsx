import RandomMovie from "./randomMovie";

const Aside = () => {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 border-r-2 z-50 pt-8 ">
      <h1 className="text-3xl mb-10  px-5">Movies</h1>
      <nav className="flex flex-col gap-4 px-5">
        <ul className="pb-8 space-y-4 font-bold border-b-2 ">
          <li className="hover:bg-red-600 hover:text-white rounded-xl p-2 cursor-pointer">
            Browse
          </li>
          <li className="hover:bg-red-600 hover:text-white rounded-xl p-2 cursor-pointer">
            Planned
          </li>
          <li className="hover:bg-red-600 hover:text-white rounded-xl p-2 cursor-pointer">
            In Progress
          </li>
          <li className="hover:bg-red-600 hover:text-white rounded-xl p-2 cursor-pointer">
            Watched
          </li>
        </ul>
      </nav>
      <RandomMovie />
    </aside>
  );
};

export default Aside;
