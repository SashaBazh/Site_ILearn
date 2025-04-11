import React from "react";
import "./Content.css"; // Подключаем CSS файл для стилизации
import SearchBar from '../SearchBar/SearchBar';
import Cards from '../Cards/Cards';

const Content = () => {
  // Создаем массив данных для 6 карточек как на картинке
  const coursesData = [
    {
      image: "/assets/images/digital-leadership.png", // Путь нужно адаптировать под вашу структуру проекта
      title: "The Art of Orientation Guided Tour",
      category: "IT",
      tags: ["Lorem ipsum"]
    },
    {
      image: "/assets/images/python-for-everybody.png",
      title: "Python for Everybody",
      category: "IT",
      tags: ["Lorem ipsum"]
    },
    {
      image: "/assets/images/arabic-calligraphy.png",
      title: "Arabic calligraphy's spirituality",
      category: "Art",
      tags: ["Culture"]
    },
    {
      image: "/assets/images/digital-leadership.png", // Путь нужно адаптировать под вашу структуру проекта
      title: "The Art of Orientation Guided Tour",
      category: "IT",
      tags: ["Lorem ipsum"]
    },
    {
      image: "/assets/images/python-for-everybody.png",
      title: "Python for Everybody",
      category: "IT",
      tags: ["Lorem ipsum"]
    },
    {
      image: "/assets/images/arabic-calligraphy.png",
      title: "Arabic calligraphy's spirituality",
      category: "Art",
      tags: ["Culture"]
    },
  ];

  return (
    <div className="content-container">
      <h2>
        Build your library for <br /> your career and personal growth
      </h2>
      <p>Find courses on almost any topic</p>
      <SearchBar />
      <Cards courses={coursesData} />
    </div>
  );
};

export default Content;