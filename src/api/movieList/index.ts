import { httpClientMovie } from "..";

export const getMovies = async (pageNum: string) => {
  try {
    const res = await httpClientMovie.get(
      `popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${pageNum}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return { results: [], next: null, previous: null };
  }
};

export const getRandomMovie = async () => {
  try {
    const totalPageNumber = 8;
    const randomPage = Math.floor(Math.random() * totalPageNumber) + 1;

    const res = await httpClientMovie.get(
      `popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${randomPage}`
    );
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching random movie:", error);
  }
};
