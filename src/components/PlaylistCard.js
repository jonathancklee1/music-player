import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useDataLayerValue } from "../DataLayer";
import SpotifyWebApi from "spotify-web-api-js";

const s = new SpotifyWebApi();
function PlaylistCard(props) {
  const [{  }, dispatch] = useDataLayerValue();

  // Get clicked playlist and set current song to first song in the list
  function setPlaylist() {
    s.getPlaylistTracks(props.id).then((tracks) => {
      dispatch({
        type: "SET_CURRENT_PLAYLIST",
        currentPlaylist: tracks.items,
      });
      dispatch({
        type: "SET_CURRENTSONG",
        currentSong: tracks.items[0].track,
      });
      dispatch({
        type: "SET_TRACK_NUMBER",
        trackNumber: 0,
      });
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
