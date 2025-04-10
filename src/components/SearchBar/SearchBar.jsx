import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Category");

  const categories = [
    "Category",
    "Programming",
    "Design",
    "Business",
    "Marketing",
    "Data Science"
  ];

  return (
    <div className="search-container">
      <div className="search-bar">
        <div className="category-dropdown">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="dropdown-arrow">
            <img src="./assets/icons/dropdown-arrow.svg"/>
          </div>
        </div>
        <div className="search-input">
          <input
            type="text"
            placeholder="Search for Programs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button">
            <img src="./assets/icons/searchbar.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;