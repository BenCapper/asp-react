import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import TvReviews from "../tvReviews"
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";


const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const TvDetails = ({ tv }) => { 
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {tv.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {tv.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip
          icon={<StarRate />}
          label={`${tv.vote_average} (${tv.vote_count} Ratings)`}
        />
        <Chip label={`Released: ${tv.first_air_date}`} />
      </Paper>
      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Production Countries" sx={{...chip}} color="primary" />
        </li>
        {tv.production_countries.map((countries) => (
          <li key={countries.name}>
            <Chip label={countries.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>



      <Paper>
      <TableContainer component={Paper}>
      <Table sx={{minWidth: 550}} aria-label="reviews table">
        <TableHead>
          <TableRow>
            <TableCell>Season Id</TableCell>
            <TableCell align="center">Season</TableCell>
            <TableCell align="right">Episodes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tv.seasons.map((s) => (
            <TableRow key={s.id}>
              <TableCell component="th" scope="row">
                {s.id}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {s.name}
              </TableCell>
              <TableCell align="right" >
              <Link
                  to={`/tv/${tv.id}/season/${s.season_number}`}
                  state={{
                      season: s,
                      tv: tv,
                  }}
                >
                 ({s.episode_count}) Episodes
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      
      
      </Paper>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <TvReviews tv={tv} />
      </Drawer>
      </>
  );
};
export default TvDetails ;