import React from "react";
import Card from "../Card/Card";
import "./Cards.css";

const Cards = ({ courses }) => {
  if (!courses.length) {
    return <div className="no-courses">No courses found</div>;
  }

  return (
    <div className="cards-container">
      <div className="cards-fade-left" />
      <div className="cards-wrapper">
        {courses.map((course) => (
          <Card
            key={course.id}
            image={course.image_url}
            title={course.title}
            tags={course.categories?.map((cat) => cat.name) || []}
            isFavorite={course.is_favorite}
          />
        ))}
      </div>
      <div className="cards-fade-right" />
    </div>
  );
};

export default Cards;
