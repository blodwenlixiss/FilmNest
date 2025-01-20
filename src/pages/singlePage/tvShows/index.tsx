import { NavLink, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTVShowsById } from "@/api/tvShowList";
import { userAtom } from "@/api";
import { useAtom } from "jotai";
import { TvShowDetails } from "./index.types";
import { ButtonList } from "../components/buttonList";

const TVShowDetails = () => {
  const { id } = useParams();
  const [user] = useAtom(userAtom);

  const {
    data: tvShow,
    isLoading,
    isError,
  } = useQuery<TvShowDetails>({
    queryKey: ["fetchTVShowsDetails", id],
    queryFn: async () => await getTVShowsById(id as string),
    enabled: !!id,
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading tvShow details.</div>;

  return (
    <div className="p-10">
      <div className="flex flex-col md:flex-row gap-10">
        <img
          src={import.meta.env.VITE_BASE_IMAGE_URL + tvShow?.poster_path}
          alt={tvShow?.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold mb-4">{tvShow?.title}</h1>
          <p className="mb-4">{tvShow?.overview}</p>
          <div className="flex flex-col gap-3 m">
            <p className="flex gap-1 text-lg">
              <strong>Genre: </strong>
              {tvShow?.genres.map((item) => (
                <span key={item.id}>{item.name}</span>
              ))}
            </p>
            <p className="text-lg">
              <strong>Release Date:</strong> {tvShow?.release_date}
            </p>
          </div>
          <p className="text-lg flex items-center gap-2">
            <img
              className="w-10"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
              alt="Imdb"
            />
            {Math.trunc((tvShow?.vote_average ?? 0) * 10) / 10}
          </p>
          <div className="mt-6 flex gap-3">
            {user ? (
              <>
                <ButtonList />
              </>
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
                  <ButtonList disabled={true} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVShowDetails;
