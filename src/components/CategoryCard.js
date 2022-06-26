import React from "react";

function CategoryCard(props) {
  return (
    <div className="category__card">
      <img className="category__img" src={props.img}></img>
      <div className="category__content">
        <span>{props.name}</span>
      </div>
    </div>
  );
}

export default CategoryCard;
