export interface TvShowDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | object; // Replace `object` with the actual structure if known
  budget: number;
  genres: { id: number; name: string }[]; // Assuming genres have `id` and `name`
  homepage: string;
  id: string;
  imdb_id: string;
  origin_country: string[]; // Array of country codes
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string; // ISO date string
  revenue: number;
  runtime: number;
  spoken_languages: { iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
