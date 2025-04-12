import React, { useState, useEffect } from "react";
import "./Content.css";
import SearchBar from "../SearchBar/SearchBar";
import Cards from "../Cards/Cards";
import { fetchCourses } from "../../api/courses";

const Content = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadInitialCourses();
  }, []);

  const loadInitialCourses = async () => {
    try {
      setLoading(true);
      const results = await fetchCourses();
      setCourses(results);
    } catch (err) {
      setError(err.message);
      console.error("Failed to load courses:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchResults = (results) => {
    setCourses(results);
  };

  return (
    <div className="content-container">
      <h2>
        Build your library for <br /> your career and personal growth
      </h2>
      <p>Find courses on almost any topic</p>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-message">Loading courses...</div>}

      <SearchBar onSearchResults={handleSearchResults} />
      <Cards courses={courses} />
    </div>
  );
};

export default Content;
