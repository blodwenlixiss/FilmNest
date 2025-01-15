import { getTVShows } from "@/api/tvShowList";
import Card from "@/pages/mainPage/card";
import { useQuery } from "@tanstack/react-query";
import { TVShowListResponse } from "../mainPage/mainPageTypes/tvShow.types";

const TvShows = () => {
  const { data: tvShows } = useQuery<TVShowListResponse>({
    queryKey: ["fetchTVShows"],
    queryFn: async () => await getTVShows(),
  });
  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold mb-6">TV-Shows</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {tvShows?.results.map((tvshow) => (
          <li key={tvshow.id} className="list-none flex ">
            <Card
              title={tvshow.name}
              imageSrc={
                import.meta.env.VITE_BASE_IMAGE_URL + tvshow.poster_path
              }
              overview={tvshow?.overview}
              releaseDate={tvshow.first_air_date}
              vote={tvshow.vote_average}
              type="tvshows"
              id={tvshow.id}
            />
          </li>
        ))}
      </div>
    </div>
  );
};

export default TvShows;
