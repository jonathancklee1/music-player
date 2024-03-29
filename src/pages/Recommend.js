import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "../DataLayer";
import { TextField, Menu, MenuItem, Button } from "@mui/material";
import GenreBubble from "../components/GenreBubble";
import RecSongRow from "../components/RecSongRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-scroll";
import {
  faAngleDown,
  faRecordVinyl,
  faMusic,
  faHeadphones,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const s = new SpotifyWebApi();
let genreArray = [];

function Recommend() {
  const [{ genres, selectedGenres }, dispatch] = useDataLayerValue();
  const [artistSearchInput, setArtistSearchInput] = useState(null);
  const [songSearchInput, setSongSearchInput] = useState(null);
  const [artistData, setArtistData] = useState([]);
  const [songData, setSongData] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [recommendedSongs, setRecommendedSongs] = useState(null);
  const open = Boolean(anchorEl);

  const noRecsMsg = () =>
    toast.error(
      "There is no recommended songs based on your selections. Please select different criteria to personalise your songs."
    );

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

  // Get recommended songs based on user input
  function getRec() {
    let genreSeeds = "";
    if (selectedGenres.length === 0 && !selectedSong && !selectedArtist) {
      noRecsMsg();
      return;
    }
    if (selectedGenres !== []) {
      genreSeeds = selectedGenres.toString();
    }
    s.getRecommendations({
      ...(genreSeeds !== "" && { seed_genres: genreSeeds }),
      ...(selectedArtist && { seed_artists: selectedArtist.id }),
      ...(selectedSong && { seed_tracks: selectedSong.id }),
    }).then((rec) => {
      setRecommendedSongs(rec.tracks);
    });
  }

  function clearSelected(type) {
    if (type === "song") {
      setSelectedSong(null);
    } else {
      setSelectedArtist(null);
    }
  }

  // Add or remove genre from already selected genres
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
        <p>Recommend me a song based on selected criteria</p>
        <div className="genre-container">
          <Button
            id="genre-btn"
            aria-controls={open ? "genre-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {" "}
            <FontAwesomeIcon icon={faRecordVinyl} />
            <span>Pick Genres</span>
            <FontAwesomeIcon icon={faAngleDown} />
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
                  key={key}
                >
                  {value}
                </MenuItem>
              );
            })}
          </Menu>
        </div>
        <div className="search-container">
          <div className="search search--songs">
            <label>
              <FontAwesomeIcon icon={faMusic} />
              Search Songs
            </label>
            <TextField
              id="song-input"
              variant="outlined"
              fullWidth
              placeholder="Song Name"
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
            <label>
              <FontAwesomeIcon icon={faHeadphones} />
              Search Artists
            </label>
            <TextField
              id="artist-input"
              variant="outlined"
              fullWidth
              placeholder="Artist Name"
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
          <p>Your Selections</p>
          <div className="selection-container">
            <div className="selected-div genre">
              <p>Genres</p>
              {selectedGenres.length !== 0 ? (
                <div className="genre-bubble-container">
                  {selectedGenreBubbles}
                </div>
              ) : (
                <div className="genre-bubble-container">
                  <span>No Genres Selected</span>
                </div>
              )}
            </div>

            <div className="selected-div song">
              <p>Song</p>
              {selectedSong ? (
                <>
                  <img src={selectedSong?.album.images[0].url}></img>
                  <span id="selected-song-name">{selectedSong?.name}</span>
                  <span id="selected-song-artist">
                    {selectedSong?.artists[0].name}
                  </span>
                  <button
                    className="clear-selection-btn"
                    onClick={() => {
                      clearSelected("song");
                    }}
                  >
                    Clear
                  </button>
                </>
              ) : (
                <span>No Song Selected</span>
              )}
            </div>
            <div className="selected-div genre">
              <p>Artist</p>
              {selectedArtist ? (
                <>
                  <img src={selectedArtist.images[0]?.url}></img>
                  <span>{selectedArtist?.name}</span>
                  <button
                    className="clear-selection-btn"
                    onClick={() => {
                      clearSelected("artist");
                    }}
                  >
                    Clear
                  </button>
                </>
              ) : (
                <span>No Artist Selected</span>
              )}
            </div>
          </div>
          <Link
            className="recommend-btn"
            offset={-100}
            to="resultsContainer"
            smooth={true}
            duration={700}
            onClick={getRec}
          >
            Recommend Me!
          </Link>
        </div>
        <div className="results-container" id="resultsContainer">
          {recommendedSongs &&
            recommendedSongs.map((song) => {
              return (
                <RecSongRow
                  key={song.id}
                  song={song}
                  img={song.album.images[0].url}
                  name={song.name}
                  artist={song.artists[0].name}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Recommend;
