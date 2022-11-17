import React, { useContext } from "react";
import { TvContext } from "../../contexts/tvContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavoritesIcon = ({ tv }) => {
  const context = useContext(TvContext);

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    context.addToFavorites(tv);
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;