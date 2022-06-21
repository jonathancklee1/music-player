import React, { useEffect, useState } from "react";
import PlaylistCard from "../components/PlaylistCard";
import { useDataLayerValue } from "../DataLayer";

import SpotifyWebApi from "spotify-web-api-js";
const s = new SpotifyWebApi();
function Library() {
  const [{ playlists }, dispatch] = useDataLayerValue();
  useEffect(() => {
    s.getUserPlaylists().then((playlist) => {
      dispatch({
        type: "SET_PLAYLISTS",
        playlists: playlist.items,
      });
    });
  }, []);
  const playlistSongComp = playlists.map((song) => {
    return (
      <PlaylistCard
        key={song.id}
        id={song.id}
        songCount={song.tracks.total}
        name={song.name}
        img={song.images[0].url}
      />
    );
  });
  return (
    <div className="library__container">
      <div className="library__content">
        <h1>Your Library</h1>
        <div className="playlist__container">{playlistSongComp}</div>
      </div>
    </div>
  );
}

export default Library;
