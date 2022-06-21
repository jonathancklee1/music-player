import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const s = new SpotifyWebApi();
function AudioController(props) {
  const [currentSong, setCurrentSong] = useState(null);
  useEffect(() => {
    // async function showPlaylists() {
    //   const res = await api.get(`playlists/${props.playlistId}/tracks`);
    //   console.log(res.data.items[0].track);
    //   setCurrentSongName(res.data.items[0].track.name);
    //   setCurrentSongArtist(res.data.items[0].track.artists[0].name);
    //   setCurrentSongImg(res.data.items[0].track.album.images[0].url);
    //   return res;
    // }
    // showPlaylists();
    // console.log(props.playlistId);
    if (props.playlistId) {
      s.getPlaylistTracks(props.playlistId).then((track) => {
        console.log(track.items[0].track);
        setCurrentSong(track.items[0].track);
      });
    }
  }, [props.playlistId]);
  // console.log(currentSong);
  // console.log(props.playlistId);
  // console.log(currentSongName);
  return (
    <div className="controller__wrapper">
      <div className="controller">
        <img
          className="controller__img"
          src={
            currentSong
              ? currentSong.album.images[0].url
              : "../assets/img/gunship.webp"
          }
        ></img>
        <div className="controller__info">
          <p>{currentSong ? "Now Playing" : "No Songs Currently Playing"}</p>
          <h2 className="controller__song">
            {currentSong ? currentSong.name : ""}
          </h2>
          <h3 className="controller__artist">
            {currentSong ? currentSong.artists[0].name : ""}
          </h3>
        </div>
        <div className="controls-wrapper">
          <div className="controls controls__prev">
            <FontAwesomeIcon icon={faBackwardStep} />
          </div>
          <div className="controls controls__play">
            <FontAwesomeIcon icon={faPlay} />
          </div>
          <div className="controls controls__next">
            <FontAwesomeIcon icon={faForwardStep} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioController;
