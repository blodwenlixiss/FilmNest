import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/mainPage";
import { ThemeProvider } from "./utlis/darkTheme";
import Movies from "./pages/movies";
import MovieDetails from "./pages/singlePage/movies";
import TvShows from "./pages/TVShows";
import TVShowDetails from "./pages/singlePage/tvShows";
import Login from "./pages/login";
import Register from "./pages/register";

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
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
