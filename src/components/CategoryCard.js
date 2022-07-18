import React from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "../DataLayer";
import { toast } from "react-toastify";

const s = new SpotifyWebApi();
function CategoryCard(props) {
  const [{}, dispatch] = useDataLayerValue();
  const trackErrorMsg = () =>
    toast.error("Track cannot be played! Please select another category");
  function getRandomPlaylist() {
    return s.getCategoryPlaylists(props.id).then((item) => {
      const playlistArr = item?.playlists?.items;
      console.log(playlistArr);
      return playlistArr[Math.floor(Math.random() * playlistArr.length)];
    });
  }
  async function getRandomSong() {
    try {
      const playlist = await getRandomPlaylist();
      console.log(playlist);
      s.getPlaylistTracks(playlist.id).then((tracks) => {
        const tracksArr = tracks.items;
        const randomSong =
          tracksArr[Math.floor(Math.random() * tracksArr.length)].track;
        console.log(randomSong);
        dispatch({
          type: "SET_CURRENTSONG",
          currentSong: randomSong,
        });
      });
    } catch (error) {
      trackErrorMsg();
    }
  }
  return (
    <div
      className="category__card"
      onClick={() => {
        dispatch({
          type: "SET_PLAYING",
          playing: true,
        });
        dispatch({
          type: "SET_CURRENT_PLAYLIST",
          currentPlaylist: null,
        });
        getRandomSong();
      }}
    >
      <img className="category__img" src={props.img}></img>
      <div className="category__content">
        <span>{props.name}</span>
      </div>
    </div>
  );
}

export default CategoryCard;
