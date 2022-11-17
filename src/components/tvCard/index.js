import React, { useContext  } from "react";
import { TvContext } from "../../contexts/tvContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';

export default function TvCard({ tv, action }) {
  const { favorites } = useContext(TvContext);
  const { mustWatch } = useContext(TvContext);

  if (favorites.find((id) => id === tv.id)) {
    tv.favorite = true;
  } else {
    tv.favorite = false
  }

  if (mustWatch.find((id) => id === tv.id)) {
    tv.mustWatch = true;
  } else {
    tv.mustWatch = false
  }
  console.log(tv.name)

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          tv.favorite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : tv.mustWatch ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <PlaylistAddCheckIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {tv.name}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          tv.poster_path
            ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {tv.first_air_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {tv.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(tv)}
        <Link to={`/tv/${tv.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}