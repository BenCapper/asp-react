import React, { useContext, useEffect, useState } from "react";
import TvPageTemplate from "../components/templateTvListPage";
import { TvContext } from "../contexts/tvContext";
import { useQueries } from "react-query";
import { getTv } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavoriteTv from "../components/cardIcons/removeFromFavoriteTv";
import WriteReviewTv from "../components/cardIcons/writeReviewTv";
import SiteHeaderTv from "../components/siteHeaderTv";
import { useNavigate } from "react-router-dom";


const TvFavoritePage = () => {
  const {favorites: tvIds } = useContext(TvContext);
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

  // Create an array of queries and run in parallel.
  const favoriteTvQueries = useQueries(
    tvIds.map((tvId) => {
      return {
        queryKey: ["tv", { id: tvId }],
        queryFn: getTv,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favoriteTvQueries.find((t) => t.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const tv = favoriteTvQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });


  return (
    <>
    <SiteHeaderTv/>
    <TvPageTemplate
      name="Favorite TV"
      tv={tv}
      action={(tv) => {
        return (
          <>
            <RemoveFromFavoriteTv tv={tv} />
            <WriteReviewTv tv={tv} />
          </>
        );
      }}
    />
    </>
  );
};

export default TvFavoritePage;