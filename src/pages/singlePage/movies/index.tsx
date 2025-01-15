import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "@/api/movieList";

const MovieDetails = () => {
  const { id } = useParams();

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fetchMovieDetails", id],
    queryFn: async () => await getMovieById(id as string),
    enabled: !!id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading movie details.</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <img
        src={import.meta.env.VITE_BASE_IMAGE_URL + movie.poster_path}
        alt={movie.title}
        className="w-full md:w-1/2 my-4"
      />
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
    </div>
  );
};

export default MovieDetails;
