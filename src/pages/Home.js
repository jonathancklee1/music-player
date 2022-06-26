import React from "react";
import { useDataLayerValue } from "../DataLayer";
function Home() {
  const [{ currentSong }] = useDataLayerValue();
  return (
    <main
      className="container home__container"
      style={{ backgroundImage: `url(${currentSong?.album.images[0].url})` }}
    >
      <div className="home__song-wrapper">
        <h1 className="home__name">{currentSong ? currentSong?.name : ""}</h1>
        <h2 className="home__artist">
          {" "}
          {currentSong ? `by ${currentSong?.artists[0].name}` : ""}{" "}
        </h2>
      </div>
    </main>
  );
}

export default Home;
