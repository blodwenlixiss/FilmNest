/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSearchItems } from "@/api/search";
import Card from "@/components/card";
import { useEffect } from "react";

const SearchResults = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get("search") || "";
  const type = params.get("type") || "movie";

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["searchResults", keyword, type],
    queryFn: () => getSearchItems(type, keyword),
  });

  useEffect(() => {
    refetch();
  }, [keyword, type, refetch]);

  if (isLoading) return <div>Loading search results...</div>;
  if (isError) return <div>Error fetching search results.</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mt-10 mb-10">
        Results for {keyword} in {type === "movie" ? "movie" : "tv"}
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {data?.results?.map((item: any) => (
          <li key={item.id}>
            <Card
              title={item.name}
              imageSrc={import.meta.env.VITE_BASE_IMAGE_URL + item.poster_path}
              overview={item?.overview}
              releaseDate={item.first_air_date}
              vote={item.vote_average}
              type={type}
              id={item.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
