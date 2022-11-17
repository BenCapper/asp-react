import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import TvDetails from "../components/tvDetails/";
import TvPageTemplate from "../components/templateTvPage";
import { getTv } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import SiteHeaderTv from "../components/siteHeaderTv";
import { useNavigate } from "react-router-dom";

const TvDetailsPage = (props) => {
  const { id } = useParams();
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

  const { data: tv, error, isLoading, isError } = useQuery(
    ["tv", { id: id }],
    getTv
  );
  

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
    <SiteHeaderTv/>
      {tv ? (
        <>
          <TvPageTemplate tv={tv}>
            <TvDetails tv={tv} />
          </TvPageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default TvDetailsPage;