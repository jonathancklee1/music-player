import axios from "axios";
import React, { useEffect } from "react";
import api from "../spotify";

function Home() {
  useEffect(() => {
    async function getData() {
      const res = await api.get("me");
      console.log(res);
    }
    getData();
  }, []);
  return (
    <main className="home__container">
      <div className="home__song-wrapper">
        <h1 className="home__name">Song Name</h1>
        <h2 className="home__artist"> by Artist </h2>
      </div>
    </main>
  );
}

export default Home;
