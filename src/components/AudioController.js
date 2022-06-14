import React from "react";

function AudioController() {
  return (
    <div className="controller__wrapper">
      <div className="controller">
        <img
          className="controller__img"
          src={require("../assets/img/gunship.webp")}
        ></img>
        <div className="controller__info">
          <p>Now Playing</p>
          <h2 className="controller__song">Tech Noir</h2>
          <h3 className="controller__artist">Gunship</h3>
        </div>
        <div className="controls-wrapper">
          <div className="controls controls__prev">Prev</div>
          <div className="controls controls__play">Play</div>
          <div className="controls controls__next">Next</div>
        </div>
      </div>
    </div>
  );
}

export default AudioController;
