import { supabase } from "@/api/supabase";
import { SupabaseMovie } from "@/pages/planned";

export const moveMovieToTable = async (
  movie: SupabaseMovie,
  currentTable: "planned" | "in_progress" | "watched",
  targetTable: "planned" | "in_progress" | "watched"
) => {
  // Delete movie from the current table
  const { error } = await supabase
    .from(currentTable)
    .delete()
    .match({ movie_id: movie.movie_id });

  if (error) {
    console.error(`Error deleting from ${currentTable}:`, error);
    return;
  }

  // Insert movie into the target table
  const { error: insertError } = await supabase
    .from(targetTable)
    .insert([movie]);

  if (insertError) {
    console.error(`Error inserting into ${targetTable}:`, insertError);
  } else {
    console.log(`Movie successfully moved to ${targetTable}.`);
  }
};
