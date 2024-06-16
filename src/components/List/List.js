import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa"; // Импортируем иконки

const List = ({ users, handleEdit, handleDelete }) => {
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
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.telephone}</td>
                <td>{user.comment}</td>
                <td>
                  <button
                    className="btn btn-sm mr-2"
                    onClick={() => handleEdit(user)}
                  >
                    <FaEdit /> {/* Иконка карандаша */}
                  </button>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    <FaTrash /> {/* Иконка корзины */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
