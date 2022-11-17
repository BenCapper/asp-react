import React, {useState, useEffect} from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { Stack } from "@mui/material";
import { Pagination } from "@mui/material";
import SiteHeader from "../components/siteHeader";
import { useNavigate } from "react-router-dom";



const HomePage = (props) => {
  const [pageNumber, setPageNumber] = useState(1);
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

  const {
    isLoading,
    isError,
    error,
    data,
  } = useQuery({
    queryKey: ['movies', pageNumber],
    queryFn: () => getMovies(pageNumber),
    keepPreviousData : true
  })

  const handleChange = (event, value) => {
    setPageNumber(value);
    window.scrollTo(0,0)
  }

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  return (
    <>
    <SiteHeader/>
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
    <Stack alignItems="center">
      <Pagination color='primary' count={10} page={pageNumber} onChange={handleChange} />
    </Stack>
    </>
);
};
export default HomePage;