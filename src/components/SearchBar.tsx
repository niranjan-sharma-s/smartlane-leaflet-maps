import React from "react";
import "../styles/SearchBar.scss";

interface SearchbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (query: string) => void;
}
const SearchBar: React.FC<SearchbarProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}) => {
  return (
    <div className="searchBar">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {
          const newQuery = e.target.value;
          setSearchQuery(newQuery);
          handleSearch(newQuery);
        }}
        placeholder="Search locations..."
      />
    </div>
  );
};

export default SearchBar;
