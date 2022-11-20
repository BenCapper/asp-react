import React, {useEffect, useState, lazy, Suspense} from "react";
import { useLocation } from "react-router-dom";
import TvPageTemplate from "../components/templateTvPage";
import SiteHeaderTv from "../components/siteHeaderTv";
import { useNavigate } from "react-router-dom";
import { FormControl } from "@mui/material";
import { Button } from "@mui/material";
const TvReview = lazy(() => import("../components/tvReview"));


const TvReviewPage = (props) => {
  let location = useLocation();
  const {tv, review} = location.state;
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
    <SiteHeaderTv/>
    <TvPageTemplate tv={tv}>
    <FormControl sx={{mt: 2, mb: 2, width: '25ch' }} variant="outlined">
        <Button variant="contained" onClick={(event) => setShowReview(!showReview)}>Show Review</Button>
    </FormControl>
    <Suspense fallback={<h1>TV Review</h1>}>
      {showReview ? <TvReview review={review} /> : null}
    </Suspense>
    </TvPageTemplate>
    </>
  );
};

export default TvReviewPage;