import React, { useContext } from "react";
import { TvContext } from "../../contexts/tvContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const AddToMustWatchIcon = ({ tv }) => {
  const context = useContext(TvContext);

  const handleAddToMustWatch = (e) => {
    e.preventDefault();
    context.addToMustWatch(tv);
  };

  return (
    <IconButton aria-label="add to must watch" onClick={handleAddToMustWatch}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToMustWatchIcon;