import { httpClientMovie } from "..";

export const getMovies = async () => {
  try {
    const res = await httpClientMovie.get(
      `movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return { results: [], next: null, previous: null };
  }
};

export const getRandomMovie = async () => {
  try {
    const totalPageNumber = 1;
    const randomPage = Math.floor(Math.random() * totalPageNumber) + 1;
    const res = await httpClientMovie.get(
      `movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${randomPage}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching random movie:", error);
  }
};

export const getMovieById = async (id: string) => {
  try {
    const response = await httpClientMovie.get(`/movie/${id}`, {
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
