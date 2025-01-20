import { supabase } from "@/api/supabase";
import Card from "@/components/card";
import { useEffect, useState } from "react";
export interface SupabaseMovie {
  genres: string;
  id: string;
  movie_id: string;
  overview: string;
  release_date: string;
  title: string;
  vote_average: number;
  poster_path: string;
  is_movie: boolean;
}

const Planned = () => {
  const [plannedMovies, setPlannedMovies] = useState<SupabaseMovie[] | null>(
    null
  );

  useEffect(() => {
    supabase
      .from("planned")
      .select("*")
      .throwOnError()
      .then((res) => {
        if (res.data) {
          setPlannedMovies(res.data as SupabaseMovie[]);
        } else {
          setPlannedMovies([]);
        }
      });
  }, []);

  return (
    <div className="py-10">
      <div>
        <h2 className="text-2xl font-bold mb-6">Planned Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {plannedMovies?.map((movie) => {
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
                  type="movies"
                  id={movie.movie_id}
                />
              </li>
            ) : (
              []
            );
          })}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mt-5 mb-6">Planned Tv Shows</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {plannedMovies?.map((movie) => {
            return !movie.is_movie ? (
              <li key={movie.movie_id} className="list-none flex">
                <Card
                  title={movie.title}
                  imageSrc={
                    import.meta.env.VITE_BASE_IMAGE_URL + movie.poster_path
                  }
                  overview={movie?.overview}
                  releaseDate={movie.release_date}
                  vote={movie.vote_average}
                  type="movies"
                  id={movie.movie_id}
                />
              </li>
            ) : (
              []
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Planned;
