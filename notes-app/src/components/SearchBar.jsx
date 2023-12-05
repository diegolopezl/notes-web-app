import React from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ search, setSearch }) {
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="search-box">
      <div className="search-bar">
        <FiSearch className="search-icon" />
        <input
          className="search-input"
          type="search"
          value={search}
          placeholder="Search"
          onChange={handleSearchChange}
          maxLength="30"
        />
      </div>
    </div>
  );
}
