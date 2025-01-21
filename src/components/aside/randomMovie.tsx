import { getRandomMovie } from "@/api/movieList";
import { Movie } from "@/types/mainPageTypes/movie.types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const RandomMovie = () => {
  const [randomMovie, setRandomMovie] = useState<Movie>();

  const { data } = useQuery({
    queryKey: ["fetchRandomMovies"],
    queryFn: async () => await getRandomMovie(),
  });

  useEffect(() => {
    if (data?.results?.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      setRandomMovie(data.results[randomIndex]);
    }
  }, [data]);

  return (
    <div className="flex flex-col justify-center mt-4 px-5">
      <span className="font-bold text-center">You Might Like</span>
      <div className="relative w-52 h-72 mt-2 group">
        <img
          className="w-full h-full object-cover rounded-md"
          src={import.meta.env.VITE_BASE_IMAGE_URL + randomMovie?.poster_path}
          alt={randomMovie?.title}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
          <NavLink to={`movies/${randomMovie?.id}`}>
            <span className="text-white text-lg font-semibold">
              View Details
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default RandomMovie;
