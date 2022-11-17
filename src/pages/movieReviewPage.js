import React, { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";
import SiteHeader from "../components/siteHeader";
import { useNavigate } from "react-router-dom";

const MovieReviewPage = (props) => {
  let location = useLocation();
  const {movie, review} = location.state;
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


  return (
    <>
    <SiteHeader/>
    <PageTemplate movie={movie}>
      <MovieReview review={review} />
    </PageTemplate>
    </>
  );
};

export default MovieReviewPage;