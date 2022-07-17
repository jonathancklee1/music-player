import React from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "../DataLayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const s = new SpotifyWebApi();
let genreArray = [];

function GenreBubble(props) {
  // const [{ selectedGenres }, dispatch] = useDataLayerValue();

  // function getGenreName() {
  //   if (!genreArray.includes(props.name)) {
  //     genreArray.push(props.name);
  //     dispatch({
  //       type: "SET_SELECTED_GENRES",
  //       action: genreArray,
  //     });
  //   } else {
  //     genreArray = genreArray.filter((item) => item !== props.name);
  //     dispatch({
  //       type: "SET_SELECTED_GENRES",
  //       action: genreArray,
  //     });
  //   }
  //   console.log(genreArray);
  // }
  return (
    <div className="genre-bubble" onClick={props.removeGenre}>
      <span className="genre-bubble-name">{props.name}</span>
      <FontAwesomeIcon icon={faTimes} />
    </div>
  );
}

export default GenreBubble;
