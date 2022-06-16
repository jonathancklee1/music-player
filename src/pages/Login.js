import React from "react";
import { loginEndpoint } from "../spotify";
function Login() {
  return (
    <>
      <h1 className="logo"> Musicify</h1>
      <div className="login__container">
        <div className="content-wrapper">
          <img
            className="spotify-icon"
            src={require("../assets/img/spotify-icon.png")}
            alt="spotify-logo"
          ></img>
          <h2>Login with Spotify</h2>

          <p>
            To view your playlists, please login with your Spotify account to
            access your songs
          </p>

          <a href={loginEndpoint} className="login__btn">
            Login
          </a>
        </div>
      </div>
    </>
  );
}

export default Login;
