import React, { useState, useEffect, lazy, Suspense} from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import SiteHeader from "../components/siteHeader";
import { useNavigate } from "react-router-dom";
import { FormControl } from "@mui/material";
import { Button } from "@mui/material";
const MovieReview = lazy(() => import("../components/movieReview"));


const MovieReviewPage = (props) => {
  let location = useLocation();
  const {movie, review} = location.state;
  const [showReview, setShowReview] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  console.log(user);

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
    <FormControl sx={{mt: 2, mb: 2, width: '25ch' }} variant="outlined">
        <Button variant="contained" onClick={(event) => setShowReview(!showReview)}>Show Review</Button>
    </FormControl>
    <Suspense fallback={<h1>Movie Review</h1>}>
      {showReview ? <MovieReview review={review} /> : null}
    </Suspense>
    </PageTemplate>
    </>
  );
};

export default MovieReviewPage;