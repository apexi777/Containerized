import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa"; // Импортируем иконки

const List = ({ users, handleEdit, handleDelete }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const toggleSelectUser = (user) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(user)) {
        return prevSelected.filter((u) => u !== user);
      } else {
        return [...prevSelected, user];
      }
    });
  };

  const handleDeleteSelected = () => {
    selectedUsers.forEach((user) => handleDelete(user.id));
    setSelectedUsers([]);
  };

  const isSingleSelected = selectedUsers.length === 1;
  const isMultipleSelected = selectedUsers.length > 1;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedUsers([]);
  };

  // Пагинация
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

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
            {currentItems.map((user, index) => (
              <tr
                key={index}
                className={selectedUsers.includes(user) ? "table-active" : ""}
                onClick={() => toggleSelectUser(user)}
              >
                <td>{user.username}</td>
                <td>{user.telephone}</td>
                <td>{user.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="actions mt-3">
        {isSingleSelected && (
          <>
            <button
              className="btn btn-sm mr-2"
              onClick={() => handleEdit(selectedUsers[0])}
            >
              <FaEdit /> {/* Иконка карандаша */}
            </button>
            <button
              className="btn btn-sm"
              onClick={() => handleDelete(selectedUsers[0].id)}
            >
              <FaTrash /> {/* Иконка корзины */}
            </button>
          </>
        )}
        {isMultipleSelected && (
          <button className="btn btn-sm" onClick={handleDeleteSelected}>
            <FaTrash /> {/* Иконка корзины */}
          </button>
        )}
      </div>
      <nav className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          {[...Array(totalPages).keys()].map((number) => (
            <li
              key={number + 1}
              className={`page-item ${currentPage === number + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(number + 1)}
              >
                {number + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default List;
