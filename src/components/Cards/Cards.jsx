import React, { useEffect, useRef } from 'react';
import Card from '../Card/Card';
import './Cards.css';

const Cards = ({ courses }) => {
  const wrapperRef = useRef(null);
  const loopedCourses = [...courses, ...courses, ...courses]; // до / основная / после

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const cardWidth = 260; // примерно ширина карточки + gap (в пикселях)
    const scrollTo = cardWidth * courses.length; // вторая часть (начало основной копии)

    wrapper.scrollLeft = scrollTo;

    const handleScroll = () => {
      const maxScroll = cardWidth * courses.length * 2;
      const minScroll = 0;

      if (wrapper.scrollLeft <= minScroll + 1) {
        // если слишком влево — прыгнуть в ту же позицию во второй части
        wrapper.scrollLeft = scrollTo + wrapper.scrollLeft;
      }

      if (wrapper.scrollLeft >= maxScroll - 1) {
        // если слишком вправо — прыгнуть назад во вторую часть
        wrapper.scrollLeft = scrollTo - (maxScroll - wrapper.scrollLeft);
      }
    };

    wrapper.addEventListener('scroll', handleScroll);
    return () => wrapper.removeEventListener('scroll', handleScroll);
  }, [courses]);

  return (
    <div className="cards-container">
      <div className="cards-fade-left" />
      <div className="cards-wrapper" ref={wrapperRef}>
        {loopedCourses.map((course, index) => (
          <Card
            key={`${index}-${course.title}`}
            image={course.image}
            title={course.title}
            category={course.category}
            tags={course.tags}
          />
        ))}
      </div>
      <div className="cards-fade-right" />
    </div>
  );
};

export default Cards;
