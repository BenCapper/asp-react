import React from "react";
import * as ReactDOM from "react-dom/client";
import MoviesContextProvider from "./contexts/moviesContext";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import UpcomingPage from "./pages/upcomingMoviesPage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import AddMovieReviewPage from './pages/addMovieReviewPage'
import TvContextProvider from "./contexts/tvContext";
import TvHomePage from "./pages/tvHomePage";
import TvDetailsPage from "./pages/tvDetailsPage";
import TvReviewsPage from "./pages/tvReviewsPage";
import TvFavoritePage from "./pages/favoriteTvPage";
import AddTvReviewPage from "./pages/addTvReviewPage";
import TvTopPage from "./pages/topTvPage";
import MustWatchTvPage from "./pages/mustWatchTvPage";
import MustWatchMoviePage from "./pages/mustWatchMoviesPage";
import LoginPage from "./pages/loginPage";
import TvEpisodesPage from "./pages/tvEpisodesPage";
import SearchPage from "./pages/searchPage";
import TrendingPage from "./pages/movieTrendingPage";
import TrendingTvPage from "./pages/tvTrendingPage";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MoviesContextProvider>
          <TvContextProvider>
            <Routes>
              <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
              <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
              <Route path="/movies/upcoming" element={<UpcomingPage />} />
              <Route path="/movies/trending" element={<TrendingPage />} />
              <Route path="/movies/mustwatch" element={<MustWatchMoviePage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
              <Route path="/tv" element={ <TvHomePage /> } />
              <Route path="/tv/:id" element={ <TvDetailsPage /> } />
              <Route path="/tv/reviews/:id" element={ <TvReviewsPage /> } />
              <Route path="/tv/reviews/form" element={ <AddTvReviewPage /> } />
              <Route path="/tv/favorites" element={ <TvFavoritePage /> } />
              <Route path="/tv/trending" element={ <TrendingTvPage /> } />
              <Route path="/tv/top" element={<TvTopPage />} />
              <Route path="/tv/mustwatch" element={<MustWatchTvPage />} />
              <Route path="/tv/:id/season/:sid" element={<TvEpisodesPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/" element={<LoginPage />} />
              <Route path="/movies" element={<HomePage />} />
              <Route path="*" element={ <Navigate to="/" /> } />
            </Routes>
          </TvContextProvider>
        </MoviesContextProvider>
      </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = ReactDOM.createRoot(  document.getElementById("root") )
rootElement.render(<App />);