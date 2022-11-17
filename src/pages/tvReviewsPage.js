import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import TvPageTemplate from "../components/templateTvPage";
import TvReview from "../components/tvReview";
import SiteHeaderTv from "../components/siteHeaderTv";
import { useNavigate } from "react-router-dom";

const TvReviewPage = (props) => {
  let location = useLocation();
  const {tv, review} = location.state;
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
    <SiteHeaderTv/>
    <TvPageTemplate tv={tv}>
      <TvReview review={review} />
    </TvPageTemplate>
    </>
  );
};

export default TvReviewPage;