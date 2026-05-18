import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search ">
      <div>
        <img src="./search.svg" alt="search" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search through thousand of movies"
        />
      </div>
    </div>
  );
};
export default Search;
