import "./styles/style.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Library from "./pages/Library";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("spotify-token");
    const hash = window.location.hash;
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      localStorage.setItem("spotify-token", _token);
      setToken(_token);
    } else {
      setToken(token);
    }
  }, []);
  return !token ? (
    <Login />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="library" element={<Library />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
