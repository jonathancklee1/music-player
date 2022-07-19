import "./styles/style.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Library from "./pages/Library";
import Login from "./pages/Login";
import Recommend from "./pages/Recommend";
import { useEffect, useState } from "react";
import { useDataLayerValue } from "./DataLayer";
import SpotifyWebApi from "spotify-web-api-js";
import Categories from "./pages/Categories";
const s = new SpotifyWebApi();
function App() {
  const [{ token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = window.location.hash;
    window.location.hash = "";
    const _token = hash.split("&")[0].split("=")[1];
    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      console.log(token);
      s.setAccessToken(_token);
    }
  }, []);
  return !token ? (
    <Login />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/music-player/" element={<SharedLayout />}>
          <Route path="home" element={<Home />}></Route>
          <Route path="categories" element={<Categories />}></Route>
          <Route path="recommend" element={<Recommend />}></Route>
          <Route path="library" element={<Library />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
