import { useState, useEffect } from "react";
import { ModeToggle } from "@/hooks/useDarkTheme";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "@/api";
import { getProfileInfo } from "@/api/account";
import { Controller, useForm } from "react-hook-form";
import { SearchFilter } from "@/pages/search/searchFilter";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

interface SearchFormValues {
  search: string;
}

const Header = () => {
  const { control, handleSubmit, setValue } = useForm<SearchFormValues>();
  const [user] = useAtom(userAtom);
  const [profileImg, setProfileImg] = useState("");
  const [searchType, setSearchType] = useState("movie");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  useEffect(() => {
    if (user?.user.id) {
      getProfileInfo(user.user.id).then((res) => {
        if (res.data && res.data.length > 0) {
          setProfileImg(res.data[0].avatar_url || "");
        }
      });
    }
  }, [user]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get("search") || "";
    const type = params.get("type") || "movie";

    setValue("search", keyword);
    setSearchType(type);
  }, [location.search, setValue]);

  const onSearchSubmit = (data: { search: string }) => {
    const keyword = data.search.trim();
    if (keyword) {
      navigate(
        `/search?search=${encodeURIComponent(keyword)}&type=${searchType}`,
      );
    }
  };

  return (
    <>
      <header className="bg-background flex justify-between items-center fixed  top-0 left-0 w-screen h-16 px-10 z-30 pt-10 pb-10">
        <form
          onSubmit={handleSubmit(onSearchSubmit)}
          className="lg:ml-64 ml-[56px] flex gap-8 relative items-center"
        >
          <div className="relative">
            <Controller
              name="search"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  className="w-min-24 lg:w-96"
                  placeholder={t(searchType === "movie" ? "Movies" : "TVShows")}
                />
              )}
            />
            <Button
              type="submit"
              className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-transparent hover:bg-transparent shadow-none w-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="hidden lg:block w-6 h-10 ml-2 text-foreground"
                fill="currentColor"
              >
                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6 .1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128 128z" />
              </svg>
            </Button>
          </div>
          <SearchFilter onTypeChange={setSearchType} />
        </form>

        <div className="hidden xl:flex items-center">
          <nav>
            <ul className="flex gap-5">
              <li>
                <NavLink
                  to="/movie"
                  className="transition-colors duration-300 hover:text-white bg-transparent shadow-none text-inherit p-2 rounded-xl hover:bg-red-600"
                >
                  {t("Movies")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tv"
                  className="transition-colors duration-300 hover:text-white bg-transparent shadow-none text-inherit p-2 rounded-xl hover:bg-red-600"
                >
                  {t("TVShows")}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="hidden xl:flex gap-6 items-center">
          <Select value={i18n.language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="w-[80px]">
              <SelectGroup>
                <SelectItem value="en">Eng</SelectItem>
                <SelectItem value="ka">Geo</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <ModeToggle />
          <NavLink to={user ? "profile" : "/login"}>
            {!profileImg ? (
              <Button className="bg-transparent text-foreground hover:bg-red-500">
                {t("Login")}
              </Button>
            ) : (
              <img
                className="w-10 h-10 rounded-full bg-blue-50"
                src={profileImg}
                alt="profile-image"
              />
            )}
          </NavLink>
        </div>
        <button
          className="xl:hidden box-border ml-4"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </header>
      <aside
        className={`fixed top-0 right-0 h-full bg-background shadow-xl transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-50 w-64`}
      >
        <div className="flex flex-col py-6 px-4">
          <button
            className="self-end mb-6"
            onClick={() => setIsSidebarOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <ul className="space-y-4">
            <li>
              <NavLink to="/movie">{t("Movies")}</NavLink>
            </li>
            <li>
              <NavLink to="/tv">{t("TVShows")}</NavLink>
            </li>
            <li>
              <Select
                value={i18n.language}
                onValueChange={handleLanguageChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ka">Georgian</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </li>
            <li>
              <ModeToggle />
            </li>
            <li>
              <NavLink to={user ? "profile" : "/login"}>
                {t(user ? "Profile" : "Login")}
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Header;
