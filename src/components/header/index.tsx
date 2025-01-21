import { ModeToggle } from "@/hooks/useDarkTheme";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "@/api";
import { useEffect, useState } from "react";
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
    <header className="bg-background flex justify-between items-center fixed top-0 left-0 w-screen h-16 px-10 z-40 pt-10 pb-10">
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className="ml-64 flex gap-8 relative items-center"
      >
        <div className="relative">
          <Controller
            name="search"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                className="w-96"
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
              className="w-6 h-10 ml-2 text-foreground"
              fill="currentColor"
            >
              <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6 .1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128 128z" />
            </svg>
          </Button>
        </div>
        <SearchFilter onTypeChange={setSearchType} />
      </form>
      <div>
        <nav>
          <ul className="flex gap-5">
            <li>
              <NavLink
                to="/movies"
                className="transition-colors duration-300 hover:text-white bg-transparent shadow-none text-inherit p-2 rounded-lg hover:bg-red-600"
              >
                {t("Movies")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tvshows"
                className="transition-colors duration-300 hover:text-white bg-transparent shadow-none text-inherit p-2 rounded-lg hover:bg-red-600"
              >
                {t("TVShows")}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <ul className="flex gap-6 items-center">
          <li>
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
          </li>
          <li>
            <ModeToggle />
          </li>
          <li>
            {user ? (
              <NavLink to="profile">
                {!profileImg ? (
                  <img
                    className="w-10 h-10 rounded-full bg-blue-50"
                    src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix"
                    alt="avatar"
                  />
                ) : (
                  <img
                    className="w-10 h-10 rounded-full bg-blue-50"
                    src={profileImg}
                    alt="profile-image"
                  />
                )}
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="transition-colors duration-300 hover:text-white bg-transparent font-bold text-sm border-2 hover:border-red-600 text-inherit py-2 px-4 rounded-3xl hover:bg-red-600"
              >
                {t("Login")}
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
