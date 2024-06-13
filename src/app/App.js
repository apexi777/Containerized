import React, { useState, useEffect } from "react";
import Form from "../components/Form/Form";
import List from "../components/List/List";
import Search from "../components/Search/Search";
import {
  searchDatabase,
  fetchData as fetchUserData,
} from "../services/service";
import "./App.css";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearch = async (query) => {
    try {
      const results = await searchDatabase(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching data:", error.message);
    }
  };

  const updateList = async () => {
    try {
      const data = await fetchUserData();
      setAllUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    updateList();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <Form
            updateList={updateList}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        </div>
        <div className="col-md-4">
          <Search onSearch={handleSearch} />
        </div>
      </div>
      <div className="mt-4">
        <List
          users={searchResults.length ? searchResults : allUsers}
          updateList={updateList}
          setSelectedUser={setSelectedUser}
        />
      </div>
    </div>
  );
};

export default App;
