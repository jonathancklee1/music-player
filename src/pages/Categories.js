import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import CategoryCard from "../components/CategoryCard";
import { useDataLayerValue } from "../DataLayer";
const s = new SpotifyWebApi();

function Categories() {
  const [{ categories }, dispatch] = useDataLayerValue();
  useEffect(() => {
    s.getCategories({ limit: 50 }).then((category) => {
      console.log(category.categories.items);
      dispatch({
        type: "SET_CATEGORIES",
        categories: category.categories.items,
      });
    });
    s.getRecommendations({
      seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
      // seed_genres: "classical,country",
      // seed_tracks: "0c6xIDDpzE81m2q797ordA",
    }).then((category) => {
      console.log(category);
    });
  }, []);

  const categoryCards = categories.map((categoryItem) => {
    return (
      <CategoryCard
        key={categoryItem.id}
        id={categoryItem.id}
        name={categoryItem.name}
        img={categoryItem.icons[0].url}
      />
    );
  });
  return (
    <div className="container categories__container">
      <div className="categories__content">
        <h1>Discover</h1>
        <p>Click to play a random song from each category</p>
        <div className="categories__wrapper">{categoryCards}</div>
      </div>
    </div>
  );
}

export default Categories;
