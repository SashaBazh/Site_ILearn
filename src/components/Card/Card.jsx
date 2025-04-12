import React from "react";
import "./Card.css";

const Card = ({ image, title, tags = [] }) => {
  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-image-container">
          <img src={image} alt={title} className="card-image" />
          <button className="favorite-button">
            <img src="./assets/icons/favorite.svg" alt="favorite" />
          </button>
        </div>
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <div className="card-tags">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <button className="info-button">
            <span>More Details</span>
            <img src="./assets/icons/arrow.svg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
