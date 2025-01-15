import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTVShowsById } from "@/api/tvShowList";

const TVShowDetails = () => {
  const { id } = useParams();

  const {
    data: tvShow,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fetchTVShowsDetails", id],
    queryFn: async () => await getTVShowsById(id as string),
    enabled: !!id,
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading tvShow details.</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{tvShow.title}</h1>
      <img
        src={import.meta.env.VITE_BASE_IMAGE_URL + tvShow.poster_path}
        alt={tvShow.title}
        className="w-full md:w-1/2 my-4"
      />
      <p>{tvShow.overview}</p>
      <p>Release Date: {tvShow.release_date}</p>
      <p>Rating: {tvShow.vote_average}</p>
    </div>
  );
};

export default TVShowDetails;
