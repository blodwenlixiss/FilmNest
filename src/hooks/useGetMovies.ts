import { getMovieById, getMovies } from "@/api/movieList";
import { MovieListResponse } from "@/pages/mainPage/mainPageTypes/movie.types";
import { MovieDetailsType } from "@/pages/singlePage/movies/index.types";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useMovies = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const fetchMovies = async () => await getMovies();

  const { data: movies } = useQuery<MovieListResponse>({
    queryKey: ["fetchMovies", i18n.language],
    queryFn: fetchMovies,
  });
  useEffect(() => {
    const handleLanguageChange = () => {
      queryClient.invalidateQueries({ queryKey: ["fetchMovies"] });
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n, queryClient]);

  return { movies };
};

export const useMovieDetails = (id: string | undefined) => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const fetchMovieDetails = async () => await getMovieById(id as string);

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery<MovieDetailsType>({
    queryKey: ["fetchMovieDetails", id, i18n.language],
    queryFn: fetchMovieDetails,
    enabled: !!id,
  });

  // Invalidate query on language change
  useEffect(() => {
    const handleLanguageChange = () => {
      queryClient.invalidateQueries({ queryKey: ["fetchMovieDetails", id] });
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n, id, queryClient]);

  return { movie, isLoading, isError };
};
