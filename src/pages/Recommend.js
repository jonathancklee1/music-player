import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "../DataLayer";
import { TextField } from "@mui/material";
import GenreBubble from "../components/GenreBubble";
const s = new SpotifyWebApi();
const query = {};

function Recommend() {
  const [{ genres }, dispatch] = useDataLayerValue();
  const [artistSearchInput, setArtistSearchInput] = useState(null);
  const [songSearchInput, setSongSearchInput] = useState(null);
  const [artistData, setArtistData] = useState([]);
  const [songData, setSongData] = useState([]);
  
  function getArtistsData() {
    if (artistSearchInput) {
      s.searchArtists(artistSearchInput).then((items) => {
        console.log(items.artists.items);
        setArtistData(items.artists.items);
      });
    }
  }

  function getSongsData() {
    s.searchTracks(songSearchInput).then((items) => {
      console.log(items.tracks.items);
      setSongData(items.tracks.items);
    });
  }

  useEffect(() => {
    getSongsData();
  }, [songSearchInput]);
  useEffect(() => {
    getArtistsData();
  }, [artistSearchInput]);

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
          <div className="search search--songs">
            <label>Search Songs</label>
            <TextField
              id="song-input"
              variant="outlined"
              fullWidth
              placeholder="Search Songs"
              onChange={(e) => setSongSearchInput(e.target.value)}
            />
            {songSearchInput && (
              <div className="data-results">
                {songData.map((value, key) => {
                  return (
                    <div className="result-item" key={value.id}>
                      {value.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="search search--artists">
            <label>Search Artists</label>
            <TextField
              id="artist-input"
              variant="outlined"
              fullWidth
              placeholder="Search Artists"
              onChange={(e) => setArtistSearchInput(e.target.value)}
            />
            {artistSearchInput && (
              <div className="data-results">
                {artistData.map((value, key) => {
                  return (
                    <div className="result-item" key={value.id}>
                      {value.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="results-container"></div>
      </div>
    </div>
  );
}

export default Recommend;
