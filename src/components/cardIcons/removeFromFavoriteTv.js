import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TvContext } from "../../contexts/tvContext";

const RemoveFromFavoritesIcon = ({ tv }) => {
  const context = useContext(TvContext);

  const handleRemoveFromFavorites = (e) => {
    e.preventDefault();
    context.removeFromFavorites(tv);
  };
  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromFavorites}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavoritesIcon;