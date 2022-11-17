import React, {useEffect, useState} from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import TvPageTemplate from "../components/templateTvPage";
import SiteHeaderTv from "../components/siteHeaderTv";
import { useNavigate } from "react-router-dom";
import { getTvSeason } from "../api/tmdb-api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import Spinner from '../components/spinner';

const TvEpisodesPage = (props) => {
  let location = useLocation();
  const {tv, season} = location.state;
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

  const { data, error, isLoading, isError } = useQuery(
    ["episodes", {id: tv.id, sid: season.season_number}],
    getTvSeason
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError){
    return <h1>{error.message}</h1>;
  }

  console.log(data.episodes)
  



  return (
    <>
    <SiteHeaderTv/>
    <TvPageTemplate tv={tv}>
    <Paper>
      <TableContainer component={Paper}>
      <Table sx={{minWidth: 550}} aria-label="reviews table">
        <TableHead>
          <TableRow>
            <TableCell>Episode</TableCell>
            <TableCell align="center">Overview</TableCell>
            <TableCell align="right">Air Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.episodes.map((e) => (
            <TableRow key={e.episode_number}>
              <TableCell component="th" scope="row">
                {e.episode_number}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {e.overview}
              </TableCell>
              <TableCell align="right" >
                {e.air_date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
    </TvPageTemplate>
    
    </>
  );
};

export default TvEpisodesPage;