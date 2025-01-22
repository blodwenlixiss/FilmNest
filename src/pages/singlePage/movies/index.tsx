import { NavLink, useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "@/api";
import { ButtonList } from "../components/buttonList";
import { handleAddInProgress } from "../util/handleAddInProgress";
import { handleAddPlanned } from "../util/handleAddPlanned";
import { handleAddWatched } from "../util/handleAddWatched";
import { useMovieDetails } from "@/hooks/useGetMovies";
import { t } from "i18next";

const MovieDetails = () => {
  const { id } = useParams();
  const [user] = useAtom(userAtom);

  const { movie } = useMovieDetails(id);

  return (
    <div className="p-4 md:p-10">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        <img
          src={import.meta.env.VITE_BASE_IMAGE_URL + movie?.poster_path}
          alt={movie?.title}
          className="w-full max-w-[300px] md:max-w-[33%] rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl font-extrabold mb-4">
            {movie?.title}
          </h1>
          <p className="mb-4 text-sm md:text-base">{movie?.overview}</p>
          <div className="flex flex-col gap-2 text-sm md:text-base">
            <p className="flex flex-wrap gap-1">
              <strong>Genre: </strong>
              {movie?.genres.map((item) => (
                <span key={item.id}>{item.name}</span>
              ))}
            </p>
            <p>
              <strong>Release Date:</strong> {movie?.release_date}
            </p>
          </div>
          <p className="text-sm md:text-lg flex items-center gap-2 mt-2">
            <img
              className="w-10"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
              alt="IMDb"
            />
            {Math.trunc((movie?.vote_average ?? 0) * 10) / 10}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {user ? (
              <ButtonList
                disabled={false}
                onWatched={() => movie && handleAddWatched(user, movie, true)}
                onInProgress={() =>
                  movie && handleAddInProgress(user, movie, true)
                }
                onPlanned={() => movie && handleAddPlanned(user, movie, true)}
              />
            ) : (
              <div>
                <p className="mb-4 text-sm md:text-base">
                  {t("pleaseLogin")}{" "}
                  <NavLink
                    className="underline text-blue-700 font-bold"
                    to="/login"
                  >
                    {t("logIn")}
                  </NavLink>{" "}
                  {t("or")}{" "}
                  <NavLink
                    className="underline text-blue-700 font-bold"
                    to="/register"
                  >
                    {t("signUp")}
                  </NavLink>{" "}
                  {t("toContinue")}.
                </p>

                <div className="flex flex-wrap gap-3">
                  <ButtonList
                    onWatched={() => console.log("rame")}
                    onInProgress={() => console.log("rame")}
                    onPlanned={() => console.log("rame")}
                    disabled={true}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
