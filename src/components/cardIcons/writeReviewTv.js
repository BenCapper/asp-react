import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router-dom";

const WriteReviewTv = ({ tv }) => {
  return (
    <Link
      to={`/tv/reviews/form`}
      state={{
          tvId: tv.id,
      }}
    >
      <RateReviewIcon color="primary" fontSize="large" />
    </Link>
  );
};

export default WriteReviewTv;