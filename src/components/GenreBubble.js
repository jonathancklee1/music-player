import React from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "../DataLayer";
const s = new SpotifyWebApi();
let genreArray = [];

function GenreBubble(props) {
  const [{ selectedGenres }, dispatch] = useDataLayerValue();

  function getGenreName() {
    if (!genreArray.includes(props.name)) {
      genreArray.push(props.name);
      dispatch({
        type: "SET_SELECTED_GENRES",
        action: genreArray,
      });
    } else {
      genreArray = genreArray.filter((item) => item !== props.name);
      dispatch({
        type: "SET_SELECTED_GENRES",
        action: genreArray,
      });
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
