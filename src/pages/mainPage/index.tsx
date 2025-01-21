import Card from "@/components/card";
import CarouselBlock from "./carousell";
import { useMovies } from "@/hooks/useGetMovies";
import { useTVShows } from "@/hooks/useGetTVShows";

const Home = () => {
  const { movies } = useMovies();
  const { tvShows } = useTVShows();

  const homeMovieList = movies?.results?.slice(0, 8) || [];
  const homeTVShowsList = tvShows?.results?.slice(0, 8) || [];

  return (
    <>
      <div className="mt-5">
        <CarouselBlock />
      </div>
      <div className="py-10">
        <h2 className="text-2xl font-bold mb-6">Popular Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {homeMovieList.map((movie) => (
            <li key={movie.id} className="list-none flex ">
              <Card
                title={movie.title}
                imageSrc={
                  import.meta.env.VITE_BASE_IMAGE_URL + movie.poster_path
                }
                overview={movie?.overview}
                releaseDate={movie.release_date}
                vote={movie.vote_average}
                type="movie"
                id={movie.id}
              />
            </li>
          ))}
        </div>
      </div>
      <div className="py-10">
        <h2 className="text-2xl font-bold mb-6">Popular TV-Shows</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {homeTVShowsList.map((tvshow) => (
            <li key={tvshow.id} className="list-none flex ">
              <Card
                title={tvshow.name}
                imageSrc={
                  import.meta.env.VITE_BASE_IMAGE_URL + tvshow.poster_path
                }
                overview={tvshow?.overview}
                releaseDate={tvshow.first_air_date}
                vote={tvshow.vote_average}
                type="tv"
                id={tvshow.id}
              />
            </li>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
