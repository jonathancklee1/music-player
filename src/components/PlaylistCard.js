import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useDataLayerValue } from "../DataLayer";
import SpotifyWebApi from "spotify-web-api-js";

const s = new SpotifyWebApi();
function PlaylistCard(props) {
  const [{ currentSong }, dispatch] = useDataLayerValue();
  function setPlaylist() {
    s.getPlaylistTracks(props.id).then((track) => {
      console.log(track.items[1].track);
      dispatch({
        type: "SET_CURRENTSONG",
        currentSong: track.items[2].track,
      });
      console.log(currentSong?.preview_url);
    });
  }
  return (
    <div
      className="playlist__card"
      onClick={() => {
        dispatch({
          type: "SET_PLAYING",
          playing: true,
        });
        setPlaylist();
      }}
    >
      <img src={props.img} className="playlist__cover"></img>
      <p className="playlist__name">{props.name}</p>
      <p className="playlist__song-count">{props.songCount} songs</p>
      <div className="playlist__play-btn">
        <FontAwesomeIcon icon={faPlay} />
      </div>
    </div>
  );
}

export default PlaylistCard;
