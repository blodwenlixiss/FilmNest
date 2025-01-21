import { httpClient } from "..";

export const getSearchItems = async (type: string, keyWord: string) => {
  try {
    const res = await httpClient.get(
      `/search/${type}?keyword?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${encodeURIComponent(
        keyWord,
      )}&&page=1`,
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching search items:", err);
    throw err;
  }
};
