import React from "react";

function Library() {
  return (
    <div className="library__container">
      <div className="library__content">
        <h1>Your Library</h1>
        <div className="playlist__container">
          <div className="playlist__card">
            <img
              src={require("../assets/img/gunship.webp")}
              className="playlist__cover"
            ></img>
            <span className="playlist__name">Demon Slayer OPs</span>
            <span className="playlist__song-count">2 songs</span>
          </div>
          <div className="playlist__card">
            <img
              src={require("../assets/img/gunship.webp")}
              className="playlist__cover"
            ></img>
            <span className="playlist__name">Demon Slayer OPs</span>
            <span className="playlist__song-count">2 songs</span>
          </div>
          <div className="playlist__card">
            <img
              src={require("../assets/img/gunship.webp")}
              className="playlist__cover"
            ></img>
            <span className="playlist__name">Demon Slayer OPs</span>
            <span className="playlist__song-count">2 songs</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Library;
