import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
function PlaylistCard(props) {
  return (
    <div className="playlist__card">
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
