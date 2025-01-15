import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/mainPage";
import { ThemeProvider } from "./utlis/darkTheme";
import Movies from "./pages/movies";
import MovieDetails from "./pages/singlePage/movies";
import TvShows from "./pages/TVShows";
import TVShowDetails from "./pages/singlePage/tvShows";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/tvshows" element={<TvShows />} />
          <Route path="/tvshows/:id" element={<TVShowDetails />} />
          <Route path="/planned" />
          <Route path="/in-progress" />
          <Route path="/watched" />
          <Route path="/login" />
          <Route path="/register" />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
