import React, { useEffect, useRef } from 'react';
import Card from '../Card/Card';
import './Cards.css';

const Cards = ({ courses }) => {
  const wrapperRef = useRef(null);
  const loopedCourses = [...courses, ...courses, ...courses];

  useEffect(() => {
    if (!courses.length) return;

    const wrapper = wrapperRef.current;
    const cardWidth = 260;
    const scrollTo = cardWidth * courses.length;

    wrapper.scrollLeft = scrollTo;

    const handleScroll = () => {
      const maxScroll = cardWidth * courses.length * 2;
      const minScroll = 0;

      if (wrapper.scrollLeft <= minScroll + 1) {
        wrapper.scrollLeft = scrollTo + wrapper.scrollLeft;
      }

      if (wrapper.scrollLeft >= maxScroll - 1) {
        wrapper.scrollLeft = scrollTo - (maxScroll - wrapper.scrollLeft);
      }
    };

    wrapper.addEventListener('scroll', handleScroll);
    return () => wrapper.removeEventListener('scroll', handleScroll);
  }, [courses]);

  if (!courses.length) {
    return <div className="no-courses">No courses found</div>;
  }

  return (
    <div className="cards-container">
      <div className="cards-fade-left" />
      <div className="cards-wrapper" ref={wrapperRef}>
        {loopedCourses.map((course, index) => (
          <Card
            key={`${course.id}-${index}`}
            image={course.image_url}
            title={course.title}
            category={course.categories?.[0]?.name || 'Uncategorized'}
            tags={[course.location, course.provided]}
            isFavorite={course.is_favorite}
          />
        ))}
      </div>
      <div className="cards-fade-right" />
    </div>
  );
};

export default Cards;