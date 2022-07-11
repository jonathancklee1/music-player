import React from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "../DataLayer";
const s = new SpotifyWebApi();

function GenreBubble(props) {
  const [{ selectedGenres }, dispatch] = useDataLayerValue();
  const genreArray = [];
  function getGenreName() {
    if (!genreArray.includes(props.name)) {
      genreArray.push(props.name);
      dispatch({
        type: "SET_SELECTED_GENRES",
        action: genreArray,
      });
    } else {
      alert("Already selected");
    }
    console.log(genreArray);
  }
  return (
    <div className="genre-bubble" onClick={getGenreName}>
      <span className="genre-bubble-name">{props.name}</span>
    </div>
  );
}

export default GenreBubble;
