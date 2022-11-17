import React, { useContext, useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import { useNavigate } from "react-router-dom";
import Spinner from '../components/spinner';
import SiteHeader from "../components/siteHeader";


const MustWatchPage = () => {
  const {mustWatch: mwIds } = useContext(MoviesContext);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("user");
    if (loggedIn) {
      const foundUser = JSON.parse(loggedIn);
      setUser(foundUser);
    }
    else navigate("/login");
  }, [navigate]);

  const mustWatchMovieQueries = useQueries(
    mwIds.map((movId) => {
      return {
        queryKey: ["movie", { id: movId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoadingMovie = mustWatchMovieQueries.find((t) => t.isLoading === true);

  if (isLoadingMovie) {
    return <Spinner />;
  }

  const movie = mustWatchMovieQueries.map((m) => {
    m.data.genre_ids = m.data.genres.map(n => n.id)
    console.log(m.data)
    return m.data
  });


  return (
    <>
    <SiteHeader/>
    <PageTemplate
      title="Must Watch Movies"
      movies={movie}
      action={(movie) => {
        return (
          <>

          </>
        );
      }}
    />
    </>
  );
};

export default MustWatchPage;