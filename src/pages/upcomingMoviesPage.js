import React, { useState, useEffect } from "react";
import { getUpcoming } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage'
import Spinner from '../components/spinner';
import PlaylistAddIcon from '../components/cardIcons/addToMustWatch';
import { useQuery } from 'react-query';
import { Stack } from "@mui/material";
import { Pagination } from "@mui/material";
import SiteHeader from "../components/siteHeader";
import { useNavigate } from "react-router-dom";

const UpcomingPage = (props) => {
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
    queryKey: ['upcoming', pageNumber],
    queryFn: () => getUpcoming(pageNumber),
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
  console.log(movies)

  // Redundant, but necessary to avoid app crashing.
  const mustWatch = movies.filter(m => m.mustWatch)
  localStorage.setItem('mustWatch', JSON.stringify(mustWatch))

  return (
    <>
    <SiteHeader/>
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <PlaylistAddIcon movie={movie} />
      }}
    />
    <Stack alignItems="center">
      <Pagination color='primary' count={10} page={pageNumber} onChange={handleChange} />
    </Stack>
    </>
);
};
export default UpcomingPage;