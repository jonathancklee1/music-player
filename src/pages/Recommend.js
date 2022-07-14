import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "../DataLayer";
import { TextField, Menu, MenuItem, Button } from "@mui/material";
import GenreBubble from "../components/GenreBubble";
const s = new SpotifyWebApi();
const query = {};
let genreArray = [];

function Recommend() {
  const [{ genres, selectedGenres }, dispatch] = useDataLayerValue();
  const [artistSearchInput, setArtistSearchInput] = useState(null);
  const [songSearchInput, setSongSearchInput] = useState(null);
  const [artistData, setArtistData] = useState([]);
  const [songData, setSongData] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState({});
  const [selectedSong, setSelectedSong] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [recommendedSongs, setRecommendedSongs] = useState(null);
  const open = Boolean(anchorEl);
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  useEffect(() => {
    getSongsData();
  }, [songSearchInput]);
  useEffect(() => {
    getArtistsData();
  }, [artistSearchInput]);

  useEffect(() => {
    s.getAvailableGenreSeeds().then((genres) => {
      dispatch({ type: "SET_GENRES", genres: genres.genres });
    });
  }, []);
  function getRec() {
    s.getRecommendations({
      seed_artists: selectedArtist.id,
      // seed_genres: "classical,country",
      seed_tracks: selectedSong.id,
    }).then((rec) => {
      console.log(rec);
      setRecommendedSongs(rec.tracks)
    });
  }

  function getGenreName(name) {
    if (!genreArray.includes(name)) {
      genreArray.push(name);
      dispatch({
        type: "SET_SELECTED_GENRES",
        selectedGenres: genreArray,
      });
    } else {
      genreArray = genreArray.filter((item) => item !== name);
      dispatch({
        type: "SET_SELECTED_GENRES",
        selectedGenres: genreArray,
      });
    }
    console.log(genreArray);
  }
  function getArtistsData() {
    if (artistSearchInput) {
      s.searchArtists(artistSearchInput).then((items) => {
        setArtistData(items.artists.items);
      });
    }
  }

  function getSongsData() {
    s.searchTracks(songSearchInput).then((items) => {
      setSongData(items.tracks.items);
    });
  }
  function removeGenre(genre) {
    console.log(genre);
    genreArray = genreArray.filter((item) => item !== genre);
    dispatch({
      type: "SET_SELECTED_GENRES",
      selectedGenres: genreArray,
    });
  }
  const selectedGenreBubbles = selectedGenres.map((genreItem) => {
    return (
      <GenreBubble
        key={genreItem}
        name={genreItem}
        removeGenre={() => removeGenre(genreItem)}
      />
    );
  });

  return (
    <div className="container rec__container">
      <div className="rec__content">
        <h1>Recommend Me</h1>
        <p>Recommend me a song based on these criterias</p>
        <div className="genre-container">
          <Button
            id="genre-btn"
            aria-controls={open ? "genre-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Choose Genres
          </Button>
          <Menu
            id="genre-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {genres.map((value, key) => {
              return (
                <MenuItem
                  onClick={() => {
                    getGenreName(value);
                    handleClose();
                  }}
                  className="genre-item"
                >
                  {value}
                </MenuItem>
              );
            })}
          </Menu>
        </div>
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
                    <div
                      className="result-item"
                      key={value.id}
                      onClick={() => {
                        setSelectedSong(value);
                        setSongSearchInput(null);
                      }}
                    >
                      <img src={value?.album?.images[0]?.url}></img>
                      <p>{value.name}</p>
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
                    <div
                      className="result-item"
                      key={value.id}
                      onClick={() => {
                        setSelectedArtist(value);
                        setArtistSearchInput(null);
                      }}
                    >
                      <img src={value?.images[0]?.url}></img>
                      <p>{value.name}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="selected-display">
          <p>You have selected</p>
          <div>
            <p>Genres:</p>
            {
              <div className="genre-bubble-container">
                {selectedGenreBubbles}
              </div>
            }
          </div>
          <p>
            Song: <span>{selectedSong?.name}</span>
          </p>
          <p>
            Artist: <span>{selectedArtist?.name}</span>
          </p>
          <button className="recommend-btn" onClick={getRec}>
            Recommend Me
          </button>
        </div>
        {recommendedSongs && <div className="results-container"></div>}
      </div>
    </div>
  );
}

export default Recommend;
