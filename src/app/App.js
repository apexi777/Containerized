/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Form from "../components/Form/Form";
import List from "../components/List/List";
import Search from "../components/Search/Search";
import {
  deleteUserFromServer,
  fetchData as fetchUserData,
} from "../services/service";
import "./App.css";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [value, setValue] = useState("");

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const results = allUsers.filter(
      (user) =>
        user.username.toLowerCase().includes(lowercasedQuery) ||
        user.telephone.toLowerCase().includes(lowercasedQuery) ||
        user.comment.toLowerCase().includes(lowercasedQuery)
    );
    console.log(results);
    setSearchResults(results);
  };

  const updateList = async () => {
    try {
      const data = await fetchUserData();
      setAllUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
    setValue("");
    setSearchResults([]);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUserFromServer(id);
      setSearchResults([]);
      setValue("");
      updateList();
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    if (value.length !== 0) {
      handleSearch(value);
    }
  }, [value]);

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
          <Search
            onSearch={handleSearch}
            allUsers={allUsers}
            value={value}
            setValue={setValue}
          />
        </div>
      </div>
      <div className="mt-4">
        <List
          users={searchResults.length ? searchResults : allUsers}
          updateList={updateList}
          setSelectedUser={setSelectedUser}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default App;
