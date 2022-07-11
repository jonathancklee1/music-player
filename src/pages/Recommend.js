import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "../DataLayer";
import { TextField } from "@mui/material";
import GenreBubble from "../components/GenreBubble";
const s = new SpotifyWebApi();
const query = {};

function Recommend() {
  const [{ genres }, dispatch] = useDataLayerValue();
  useEffect(() => {
    s.getAvailableGenreSeeds().then((genres) => {
      console.log(genres);
      dispatch({ type: "SET_GENRES", genres: genres.genres });
    });
    //  s.getRecommendations({
    //    seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
    //    // seed_genres: "classical,country",
    //    // seed_tracks: "0c6xIDDpzE81m2q797ordA",
    //  }).then((category) => {
    //    console.log(category);
    //  });
  }, []);
  const genreBubbles = genres.map((genreItem) => {
    return <GenreBubble key={genreItem} name={genreItem} />;
  });
  return (
    <div className="container rec__container">
      <div className="rec__content">
        <h1>Recommend Me</h1>
        <p>Recommend me a song based on these criterias</p>
        <div className="genre-container">{genreBubbles}</div>
        <div className="search-container">
          <div className="search--songs">
            <label>Search Songs</label>
            <TextField id="outlined-basic" variant="outlined" fullWidth />
          </div>
          <div className="search--artists">
            <label>Search Artists</label>
            <TextField id="outlined-basic" variant="outlined" fullWidth />
          </div>
        </div>
        <div className="results-container"></div>
      </div>
    </div>
  );
}

export default Recommend;
