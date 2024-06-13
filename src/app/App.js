import React, { useState } from "react";
import Form from "../components/Form/Form";
import List from "../components/List/List";
import Search from "../components/Search/Search";
import { searchDatabase } from "../services/service";
import "./App.css";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    try {
      const results = await searchDatabase(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching data:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <Form />
        </div>
        <div className="col-md-4">
          <Search onSearch={handleSearch} />
        </div>
      </div>
      <div className="mt-4">
        <List users={searchResults.length ? searchResults : null} />
      </div>
    </div>
  );
};

export default App;
