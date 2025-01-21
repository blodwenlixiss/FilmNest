import { supabase } from "@/api/supabase";
import { MovieDetailsType } from "../../../types/singlePage/singleMovie.types";
import { Session } from "@supabase/supabase-js";
import { TvShowDetails } from "../../../types/singlePage/singleTvshow.types";

export const handleAddInProgress = async (
  user: Session | null,
  movie: MovieDetailsType | TvShowDetails,
  isMovie: boolean
) => {
  if (movie && user) {
    try {
      const userId = user?.user?.id;
      const { data: watchedData, error: watchedError } = await supabase
        .from("watched")
        .select("id")
        .eq("movie_id", movie.id)
        .eq("id", userId);

      if (watchedError) {
        console.error("Error checking watched table:", watchedError.message);
        alert("Error occurred while checking watched movies.");
        return;
      }

      if (watchedData?.length) {
        const { error: deleteWatchedError } = await supabase
          .from("watched")
          .delete()
          .eq("movie_id", movie.id)
          .eq("id", userId);

        if (deleteWatchedError) {
          console.error(
            "Error deleting from watched table:",
            deleteWatchedError.message
          );
          alert("Failed to remove movie from watched.");
          return;
        }
      }

      const { data: plannedData } = await supabase
        .from("planned")
        .select("id")
        .eq("movie_id", movie.id)
        .eq("id", userId);

      if (plannedData?.length) {
        const { error: deleteInProgressError } = await supabase
          .from("planned")
          .delete()
          .eq("movie_id", movie.id)
          .eq("id", userId);

        if (deleteInProgressError) {
          console.error(
            "Error deleting from in_progress table:",
            deleteInProgressError.message
          );
          alert("Failed to remove movie from in-progress.");
          return;
        }
      }
      const { error } = await supabase.from("in_progress").insert({
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
