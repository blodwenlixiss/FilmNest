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
// import SearchResults from "./pages/search";
import { useAuthListener } from "./hooks";
import { ProfileGuard, RouteGuard } from "./components/routeGuard";
import ProfilePage from "./pages/profile";
import Planned from "./pages/planned";
import InProgress from "./pages/progress";
import Watched from "./pages/watched";
import SearchResults from "./pages/search";

function App() {
  useAuthListener();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/tvshows" element={<TvShows />} />
          <Route path="/tvshows/:id" element={<TVShowDetails />} />
          <Route
            path="/planned"
            element={
              <ProfileGuard>
                <Planned />
              </ProfileGuard>
            }
          />
          <Route
            path="/in-progress"
            element={
              <ProfileGuard>
                <InProgress />
              </ProfileGuard>
            }
          />
          <Route
            path="/watched"
            element={
              <ProfileGuard>
                <Watched />
              </ProfileGuard>
            }
          />
          <Route
            path="/profile"
            element={
              <ProfileGuard>
                <ProfilePage />
              </ProfileGuard>
            }
          />
        </Route>
        <Route
          path="/login"
          element={
            <RouteGuard>
              <Login />
            </RouteGuard>
          }
        />
        <Route
          path="/register"
          element={
            <RouteGuard>
              <Register />
            </RouteGuard>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
