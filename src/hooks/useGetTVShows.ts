import { useQuery } from "@tanstack/react-query";
import { getTVShows, getTVShowsById } from "@/api/tvShowList";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { TVShowListResponse } from "@/types/mainPageTypes/tvShow.types";
import { TvShowDetails } from "@/types/singlePage/singleTvshow.types";

export const useTVShows = () => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const fetchTVShows = async () => await getTVShows();

  const { data: tvShows } = useQuery<TVShowListResponse>({
    queryKey: ["fetchTVShows", i18n.language],
    queryFn: fetchTVShows,
  });

  useEffect(() => {
    const handleLanguageChange = () => {
      queryClient.invalidateQueries({ queryKey: ["fetchTVShows"] });
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n, queryClient]);

  return { tvShows };
};

export const useTVShowDetails = (id: string | undefined) => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const fetchTVShowDetails = async () => await getTVShowsById(id as string);

  const { data: tvShow } = useQuery<TvShowDetails>({
    queryKey: ["fetchTVShow", id, i18n.language],
    queryFn: fetchTVShowDetails,
    enabled: !!id,
  });

  useEffect(() => {
    const handleLanguageChange = () => {
      queryClient.invalidateQueries({ queryKey: ["fetchTVShow", id] });
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n, id, queryClient]);

  return { tvShow };
};
