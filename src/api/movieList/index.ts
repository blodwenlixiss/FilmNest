import { httpClient } from "..";
import i18n from "i18next";

export const getMovies = async (query: string = "") => {
  const language = i18n.language;
  try {
    const endpoint = query
      ? `search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=${language}&page=1&query=${query}`
      : `movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=${language}&page=1`;

    const res = await httpClient.get(endpoint);
    return res.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { results: [], next: null, previous: null };
  }
};

export const getRandomMovie = async () => {
  const language = i18n.language;
  try {
    const totalPageNumber = 1;
    const randomPage = Math.floor(Math.random() * totalPageNumber) + 1;
    const res = await httpClient.get(
      `movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=${language}&page=${randomPage}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching random movie:", error);
  }
};

export const getMovieById = async (id: string) => {
  const language = i18n.language;
  try {
    const response = await httpClient.get(`/movie/${id}`, {
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
export const searchKeywords = async (query: string) => {
  const language = i18n.language;
  try {
    if (!query) {
      return { results: [], next: null, previous: null };
    }

    const res = await httpClient.get(
      `search/keyword?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=${language}&page=1&query=${query}`
    );
    return res.data;
  } catch (error) {
    console.error("Error searching keywords:", error);
    return { results: [], next: null, previous: null };
  }
};
