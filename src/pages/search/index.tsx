import { useQuery } from "@tanstack/react-query";
import { searchKeywords } from "@/api/movieList";

const KeywordSearch = ({ query }: { query: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["searchKeywords", query],
    queryFn: () => searchKeywords(query),
    enabled: !!query, // Fetch only if query exists
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching keywords.</div>;

  return (
    <div>
      <h2 className="text-xl font-bold">Search Results</h2>
      <ul>
        {data.results.map((keyword: { id: number; name: string }) => (
          <li key={keyword.id}>{keyword.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default KeywordSearch;
