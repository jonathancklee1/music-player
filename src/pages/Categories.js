import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import CategoryCard from "../components/CategoryCard";
import { useDataLayerValue } from "../DataLayer";
const s = new SpotifyWebApi();

function Categories() {
  const [{ categories }, dispatch] = useDataLayerValue();

  // Display categories
  useEffect(() => {
    s.getCategories({ limit: 50 }).then((category) => {
      dispatch({
        type: "SET_CATEGORIES",
        categories: category.categories.items,
      });
    });
  }, []);

  // Create a card for each category
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
