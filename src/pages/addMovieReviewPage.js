import React, {useState, useEffect} from "react";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import SiteHeader from "../components/siteHeader";
import { useNavigate } from "react-router-dom";


const WriteReviewPage = (props) => {
  const location = useLocation();
  const movieId = location.state.movieId;
  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: movieId }],
    getMovie
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
    <SiteHeader/>
    <PageTemplate movie={movie}>
      <ReviewForm movie={movie} />
    </PageTemplate>
    </>
  );
};

export default WriteReviewPage;