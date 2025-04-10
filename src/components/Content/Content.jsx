import React from "react";
import "./Content.css"; // Подключаем CSS файл для стилизации
import SearchBar from '../SearchBar/SearchBar';

const Content = () => {
  return (
    <div className="content-container">
      <h2>
        Build your library for <br /> your career and personal growth
      </h2>
      <p>Find courses on almost any topic</p>
      <SearchBar />
    </div>
  );
};

export default Content;
