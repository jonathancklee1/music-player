import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "../DataLayer";
const s = new SpotifyWebApi();
function CategoryCard(props) {
  let playlist = [];
  const [{ currentSong }, dispatch] = useDataLayerValue();
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
        dispatch({
          type: "SET_CURRENTSONG",
          currentSong: randomSong,
        });
      });
    } catch (error) {
      alert("Track cannot be played! Please select another category");
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
        getRandomSong();

        // s.getCategoryPlaylists(props.id).then((item) => {
        //   // getRandomPlaylist(item.playlists?.items);
        //   getRandomSong(item.playlists?.items);
        //   // console.log(playlist);
        // });
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
