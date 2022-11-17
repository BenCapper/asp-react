import React, { useState } from "react";
import TvHeaderList from "../tvHeaderList";
import FilterCard from "../filterTvCard";
import TvList from "../tvList";
import Grid from "@mui/material/Grid";

function TvListPageTemplate({ tv, name, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);

  let displayedTv = tv
    .filter((m) => {
      return m.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };
  console.log(name)
  return (
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <TvHeaderList name={name} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        <TvList action={action} tv={displayedTv}></TvList>
      </Grid>
    </Grid>
  );
}
export default TvListPageTemplate;