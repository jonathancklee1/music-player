import React, { useEffect, useState } from "react";
import api from "../spotify";
import PlaylistCard from "../components/PlaylistCard";

function Library() {
  const [playlistSongs, setPlaylistSongs] = useState([]);
  useEffect(() => {
    async function getPlaylists() {
      const res = await api.get("me/playlists");
      console.log(res.data.items);
      setPlaylistSongs(res.data.items);
      return res;
    }
    getPlaylists();
  }, []);
  const playlistSongComp = playlistSongs.map((song) => {
    return (
      <PlaylistCard
        key={song.id}
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
