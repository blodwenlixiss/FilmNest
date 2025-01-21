import { supabase } from "@/api/supabase";
import { Session } from "@supabase/supabase-js";
import { MovieDetailsType } from "../../../types/singlePage/singleMovie.types";
import { TvShowDetails } from "../../../types/singlePage/singleTvshow.types";

export const handleAddPlanned = async (
  user: Session | null,
  movie: MovieDetailsType | TvShowDetails,
  isMovie: boolean
) => {
  if (movie && user) {
    try {
      const userId = user?.user?.id;
      const { data: watchedData } = await supabase
        .from("watched")
        .select("id")
        .eq("movie_id", movie.id)
        .eq("id", userId);

      if (watchedData?.length) {
        await supabase
          .from("watched")
          .delete()
          .eq("movie_id", movie.id)
          .eq("id", userId);
      }

      const { data: plannedData } = await supabase
        .from("in_progress")
        .select("id")
        .eq("movie_id", movie.id)
        .eq("id", userId);

      if (plannedData?.length) {
        await supabase
          .from("in_progress")
          .delete()
          .eq("movie_id", movie.id)
          .eq("id", userId);
      }
      const { error } = await supabase.from("planned").insert({
        title: movie.title ?? "Untitled",
        overview: movie.overview ?? null,
        release_date: movie.release_date ?? null,
        vote_average: movie.vote_average ?? null,
        genres: movie.genres?.join(", ") ?? null,
        id: userId,
        poster_path: movie.poster_path,
        movie_id: movie.id,
        is_movie: isMovie,
      });

      if (error) {
        console.error("Error adding planned movie:", error.message);
        alert("Failed to add movie. Please try again.");
      } else {
        console.log("Movie added to Planned successfully");
        alert("Movie added successfully.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  } else {
    console.log("User not logged in or movie data is missing");
  }
};
