import React, { useState, useEffect } from 'react';
import { fetchData as fetchUserData } from '../../services/service';// Переименовываем функцию fetchData в fetchUserData

const List = ({ users }) => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (!users) {
      fetchData();
    }
  }, [users]);

  const fetchData = async () => {
    try {
      const data = await fetchUserData();
      setAllUsers(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const displayedUsers = users || allUsers;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User List</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Telephone</th>
              <th scope="col">Comment</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.telephone}</td>
                <td>{user.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;