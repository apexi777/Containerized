import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="mt-5" onSubmit={handleSearch}>
      <div className="card">
        <div className="card-body">
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mb-2">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
