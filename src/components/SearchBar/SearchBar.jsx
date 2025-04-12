import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";
import { fetchCourses } from "../../api/courses";
import { fetchCategories } from "../../api/categories";

const SearchBar = ({ onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([
    { id: "all", name: "Category" },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef();
  const lastSearchRef = useRef({ query: "", category: "all" });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories([
          { id: "all", name: "Category" },
          ...fetchedCategories.map((cat) => ({ id: cat.id, name: cat.name })),
        ]);
      } catch (err) {
        console.error("Error loading categories:", err);
        setError("Failed to load categories");
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (
      searchQuery === lastSearchRef.current.query &&
      selectedCategory === lastSearchRef.current.category
    ) {
      return;
    }

    lastSearchRef.current = { query: searchQuery, category: selectedCategory };

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(async () => {
      try {
        const categoryId = selectedCategory !== "all" ? selectedCategory : null;
        const results = await fetchCourses(categoryId, searchQuery);

        onSearchResults?.(results);
      } catch (err) {
        console.error("Error searching courses:", err);
        setError("Search failed. Please try again.");
      }
    }, 500);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [searchQuery, selectedCategory, onSearchResults]);

  const handleSelectClick = () => setIsOpen(!isOpen);
  const handleSelectBlur = () => setIsOpen(false);
  const handleSubmit = (e) => e.preventDefault();

  return (
    <div className="search-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <div className="category-dropdown">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            onClick={handleSelectClick}
            onBlur={handleSelectBlur}
            disabled={isLoading}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
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
          <div className="search-button">
            <img src="./assets/icons/searchbar.svg" alt="" />
          </div>
        </div>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default SearchBar;
