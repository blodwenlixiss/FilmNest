import { NavLink, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "@/api/movieList";
import { MovieDetailsType } from "./index.types";
import { useAtom } from "jotai";
import { userAtom } from "@/api";
import { ButtonList } from "../components/buttonList";
import { handleAddInProgress } from "../util/handleAddInProgress";
import { handleAddPlanned } from "../util/handleAddPlanned";
import { handleAddWatched } from "../util/handleAddWatched";
const MovieDetails = () => {
  const { id } = useParams();
  const [user] = useAtom(userAtom);

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery<MovieDetailsType>({
    queryKey: ["fetchMovieDetails", id],
    queryFn: async () => await getMovieById(id as string),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-500">
          Error loading movie details.
        </p>
      </div>
    );
  return (
    <div className="p-10">
      <div className="flex flex-col md:flex-row gap-10">
        <img
          src={import.meta.env.VITE_BASE_IMAGE_URL + movie?.poster_path}
          alt={movie?.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold mb-4">{movie?.title}</h1>
          <p className="mb-4">{movie?.overview}</p>
          <div className="flex flex-col gap-3 m">
            <p className="flex gap-1 text-lg">
              <strong>Genre: </strong>
              {movie?.genres.map((item) => (
                <span key={item.id}>{item.name}</span>
              ))}
            </p>
            <p className="text-lg">
              <strong>Release Date:</strong> {movie?.release_date}
            </p>
          </div>
          <p className="text-lg flex items-center gap-2">
            <img
              className="w-10"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
              alt="Imdb"
            />
            {Math.trunc((movie?.vote_average ?? 0) * 10) / 10}
          </p>
          <div className="mt-6 flex gap-3">
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
                <p className="mb-5">
                  Please{" "}
                  <NavLink
                    className="underline text-blue-700 font-bold"
                    to="/login"
                  >
                    Log in
                  </NavLink>{" "}
                  or{" "}
                  <NavLink
                    className="underline text-blue-700 font-bold"
                    to="/register"
                  >
                    Sign up
                  </NavLink>{" "}
                  to continue.
                </p>
                <div className="flex gap-3">
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
