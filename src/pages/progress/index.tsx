import { supabase } from "@/api/supabase";
import Card from "@/components/card";
import { useState, useEffect } from "react";
import { SupabaseMovie } from "../planned";

const InProgress = () => {
  const [inProgressMovies, setInProgressMovies] = useState<
    SupabaseMovie[] | null
  >(null);

  useEffect(() => {
    supabase
      .from("in_progress")
      .select("*")
      .throwOnError()
      .then((res) => {
        if (res.data) {
          setInProgressMovies(res.data as SupabaseMovie[]);
        } else {
          setInProgressMovies([]);
        }
      });
  }, []);

  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold mb-6">Watched Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {inProgressMovies?.map((movie) => {
          return movie.is_movie ? (
            <li key={movie.movie_id} className="list-none flex">
              <Card
                title={movie.title}
                imageSrc={
                  import.meta.env.VITE_BASE_IMAGE_URL + movie.poster_path
                }
                overview={movie?.overview}
                releaseDate={movie.release_date}
                vote={movie.vote_average}
                type="movie"
                id={movie.movie_id}
              />
            </li>
          ) : (
            []
          );
        })}
      </div>
      <h2 className="text-2xl font-bold mb-6">Watched TvShows</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {inProgressMovies?.map((tvshow) => {
          return !tvshow.is_movie ? (
            <li key={tvshow.movie_id} className="list-none flex">
              <Card
                title={tvshow.title}
                imageSrc={
                  import.meta.env.VITE_BASE_IMAGE_URL + tvshow.poster_path
                }
                overview={tvshow?.overview}
                releaseDate={tvshow.release_date}
                vote={tvshow.vote_average}
                type="tv"
                id={tvshow.movie_id}
              />
            </li>
          ) : (
            []
          );
        })}
      </div>
    </div>
  );
};

export default InProgress;
