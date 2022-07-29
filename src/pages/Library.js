import React, { useEffect, useState } from "react";
import PlaylistCard from "../components/PlaylistCard";
import { useDataLayerValue } from "../DataLayer";

import SpotifyWebApi from "spotify-web-api-js";
const s = new SpotifyWebApi();
function Library() {
  const [{ playlists }, dispatch] = useDataLayerValue();
  // Retrieve user's playlists
  useEffect(() => {
    s.getUserPlaylists({ limit: 50 }).then((playlist) => {
      dispatch({
        type: "SET_PLAYLISTS",
        playlists: playlist.items,
      });
    });
  }, []);
  // Create playlist card for every playlist that the user has
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
    <div className="container library__container">
      <div className="library__content">
        <h1>Your Library</h1>
        <div className="playlist__container">{playlistSongComp}</div>
      </div>
    </div>
  );
}

export default Library;
