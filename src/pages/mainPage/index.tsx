import { getMovies } from "@/api/movieList";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "./card";
import { MovieListResponse } from "./movie.types";
import CarouselBlock from "./carousell";

const Home = () => {
  const { data, isLoading, isError } = useQuery<MovieListResponse>({
    queryKey: ["fetchMovies"],
    queryFn: async () => await getMovies("1"),
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching movies.</div>;
  console.log(data);
  return (
    <>
      <div className="p-10">
        <div className="">
          <CarouselBlock />
        </div>
      </div>
      <div className="py-6">
        <h2 className="text-2xl font-bold mb-6">Popular Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {data?.results.map((movie) => (
            <li key={movie.id} className="list-none flex ">
              <MovieCard
                title={movie.title}
                imageSrc={
                  import.meta.env.VITE_BASE_IMAGE_URL + movie.poster_path
                }
                overview={movie?.overview}
                releaseDate={movie.release_date}
                vote={movie.vote_average}
              />
            </li>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
