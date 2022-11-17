import React, { useContext, useState, useEffect } from "react";
import TvPageTemplate from "../components/templateTvListPage";
import { TvContext } from "../contexts/tvContext";
import { useQueries } from "react-query";
import { getTv } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import SiteHeaderTv from "../components/siteHeaderTv";
import { useNavigate } from "react-router-dom";


const MustWatchTvPage = () => {
  const {mustWatch: mwIds } = useContext(TvContext);
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

  const mustWatchTvQueries = useQueries(
    mwIds.map((tvId) => {
      return {
        queryKey: ["tv", { id: tvId }],
        queryFn: getTv,
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoadingTv = mustWatchTvQueries.find((t) => t.isLoading === true);

  if (isLoadingTv) {
    return <Spinner />;
  }

  const tv = mustWatchTvQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });



  return (
    <>
    <SiteHeaderTv/>
    <TvPageTemplate
      name="Must Watch TV"
      tv={tv}
      action={(tv) => {
        return (
          <>

          </>
        );
      }}
    />
    </>
  );
};

export default MustWatchTvPage;