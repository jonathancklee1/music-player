import React from "react";

function RecSongRow(props) {
  return (
    <div className="rec__song-row">
      <img src={props.img}></img>
      <div>
        <span className="rec__song-name">{props.name}</span>
        <span className="rec__song-artist">by {props.artist}</span>
      </div>
    </div>
  );
}

export default RecSongRow;
