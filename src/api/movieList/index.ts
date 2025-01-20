import { httpClient } from "..";

export const getMovies = async (query: string = "") => {
  try {
    const endpoint = query
      ? `search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1&query=${query}`
      : `movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`;

    const res = await httpClient.get(endpoint);
    return res.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { results: [], next: null, previous: null };
  }
};

export const getRandomMovie = async () => {
  try {
    const totalPageNumber = 1;
    const randomPage = Math.floor(Math.random() * totalPageNumber) + 1;
    const res = await httpClient.get(
      `movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${randomPage}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching random movie:", error);
  }
};

export const getMovieById = async (id: string) => {
  try {
    const response = await httpClient.get(`/movie/${id}`, {
      params: {
        language: "en-US",
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
  try {
    if (!query) {
      return { results: [], next: null, previous: null };
    }

    const res = await httpClient.get(
      `search/keyword?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1&query=${query}`
    );
    return res.data;
  } catch (error) {
    console.error("Error searching keywords:", error);
    return { results: [], next: null, previous: null };
  }
};
