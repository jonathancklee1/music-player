import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useOutletContext } from "react-router-dom";

function PlaylistCard(props) {
  const [playlistId, setPlaylistId] = useOutletContext();
  return (
    <div
      className="playlist__card"
      onClick={() => {
        setPlaylistId(props.id);
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
