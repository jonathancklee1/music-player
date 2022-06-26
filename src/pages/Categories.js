import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import CategoryCard from "../components/CategoryCard";
import { useDataLayerValue } from "../DataLayer";
const s = new SpotifyWebApi();

function Categories() {
  const [{ categories }, dispatch] = useDataLayerValue();
  useEffect(() => {
    s.getCategories({ limit: 30 }).then((category) => {
      console.log(category.categories.items);
      dispatch({
        type: "SET_CATEGORIES",
        categories: category.categories.items,
      });
    });
  }, []);

  const categoryCards = categories.map((categoryItem) => {
    return (
      <CategoryCard
        key={categoryItem.id}
        name={categoryItem.name}
        img={categoryItem.icons[0].url}
      />
    );
  });
  return (
    <div className="container categories__container">
      <div className="categories__content">
        <h1>Categories</h1>
        <div className="categories__wrapper">{categoryCards}</div>
      </div>
    </div>
  );
}

export default Categories;
