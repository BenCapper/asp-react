import React, {useState, useEffect} from "react";
import TvPageTemplate from "../components/templateTvPage";
import TvReviewForm from "../components/tvReviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getTv } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import SiteHeaderTv from "../components/siteHeaderTv";
import { useNavigate } from "react-router-dom";


const WriteReviewPage = (props) => {
  const location = useLocation();
  const tvId = location.state.tvId;
  const { data: tv, error, isLoading, isError } = useQuery(
    ["tv", { id: tvId }],
    getTv
  );
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

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <>
    <SiteHeaderTv/>
    <TvPageTemplate tv={tv}>
      <TvReviewForm tv={tv} />
    </TvPageTemplate>
    </>
  );
};

export default WriteReviewPage;