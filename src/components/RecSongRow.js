import React from "react";
import { useDataLayerValue } from "../DataLayer";
function RecSongRow(props) {
  const [{}, dispatch] = useDataLayerValue();
  function setCurrentSong() {
    dispatch({
      type: "SET_CURRENTSONG",
      currentSong: props.song,
    });
    dispatch({
      type: "SET_PLAYING",
      playing: true,
    });
  }
  return (
    <div className="rec__song-row" onClick={setCurrentSong}>
      <img src={props.img}></img>
      <div>
        <span className="rec__song-name">{props.name}</span>
        <span className="rec__song-artist">by {props.artist}</span>
      </div>
    </div>
  );
}

export default RecSongRow;
