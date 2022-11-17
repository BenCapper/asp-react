import React, { useState, useEffect } from "react";
import { getAllTv } from "../api/tmdb-api";
import TvListPageTemplate from '../components/templateTvListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavoritesTv';
import { Stack } from "@mui/material";
import { Pagination } from "@mui/material";
import SiteHeaderTv from "../components/siteHeaderTv";
import { useNavigate } from "react-router-dom";

const TvHomePage = (props) => {
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
    queryKey: ['discoverTv', pageNumber],
    queryFn: () => getAllTv(pageNumber),
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
  const allTv = data.results;
  console.log(allTv)

  // Redundant, but necessary to avoid app crashing.
  const favorites = allTv.filter(m => m.favorite)
  localStorage.setItem('favoritesTv', JSON.stringify(favorites))

  return (
    <>
    <SiteHeaderTv/>
    <TvListPageTemplate
      name="Discover TV"
      tv={allTv}
      action={(tv) => {
        return <AddToFavoritesIcon tv={tv} />
      }}
    />
    <Stack alignItems="center">
      <Pagination color='primary' count={10} page={pageNumber} onChange={handleChange} />
    </Stack>
    </>
);
};
export default TvHomePage;