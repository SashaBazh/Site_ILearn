import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    "Category",
    "Programming",
    "Design",
    "Business",
    "Marketing",
    "Data Science"
  ];

  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectBlur = () => {
    setIsOpen(false);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <div className="category-dropdown">
          <select
            value={selectedCategory}
            onChange={handleSelectChange}
            onClick={handleSelectClick}
            onBlur={handleSelectBlur}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className={`dropdown-arrow ${isOpen ? "rotated" : ""}`}>
            <img src="./assets/icons/dropdown-arrow.svg" alt="arrow" />
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