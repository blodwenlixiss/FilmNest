import { httpClient } from "..";
import i18n from "i18next";

export const getTVShows = async () => {
  const language = i18n.language;
  try {
    const res = await httpClient.get(
      `tv/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=${language}&page=1`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return { results: [], next: null, previous: null };
  }
};

export const getTVShowsById = async (id: string) => {
  const language = i18n.language;
  try {
    const response = await httpClient.get(`/tv/${id}`, {
      params: {
        language: language,
        api_key: import.meta.env.VITE_API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw new Error("Failed to fetch movie details.");
  }
};
