import { getMovies } from "@/api/movieList";
import Card from "@/components/card";
import { useQuery } from "@tanstack/react-query";
import { MovieListResponse } from "../mainPage/mainPageTypes/movie.types";

const Movies = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery<MovieListResponse>({
    queryKey: ["fetchMovies"],
    queryFn: async () => await getMovies(),
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching movies.</div>;

  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold mb-6">Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {movies?.results.map((movie) => (
          <li key={movie.id} className="list-none flex ">
            <Card
              title={movie.title}
              imageSrc={import.meta.env.VITE_BASE_IMAGE_URL + movie.poster_path}
              overview={movie?.overview}
              releaseDate={movie.release_date}
              vote={movie.vote_average}
              type="movies"
              id={movie.id}
            />
          </li>
        ))}
      </div>
    </div>
  );
};

export default Movies;
