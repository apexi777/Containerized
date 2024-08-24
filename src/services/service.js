// REACT_APP_API_SERVER=http://10.0.1.10:5000
// const apiUrl = process.env.REACT_APP_API_SERVER;
// const apiUrl = "/api";
const apiUrl = "http://127.0.0.1:5000";

const sendDataToServer = async (formData) => {
  try {
    const response = await fetch(`${apiUrl}/add_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit data");
    }

    const data = await response.json();
    console.log("Data submitted successfully:", data);
    return data;
  } catch (error) {
    console.error("Error submitting data:", error.message);
    throw error;
  }
};

const fetchData = async () => {
  try {
    const response = await fetch(`${apiUrl}/get_users`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

const updateUserOnServer = async (id, formData) => {
  try {
    const response = await fetch(`${apiUrl}/update_user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update data");
    }

    const data = await response.json();
    console.log("Data updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error updating data:", error.message);
    throw error;
  }
};

const deleteUserFromServer = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/delete_user/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete data");
    }

    const data = await response.json();
    console.log("Data deleted successfully:", data);
    return data;
  } catch (error) {
    console.error("Error deleting data:", error.message);
    throw error;
  }
};

const searchDatabase = async (query) => {
  try {
    const response = await fetch(
      `${apiUrl}/search?query=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      const errorDetails = await response.text(); // Получаем текст ошибки от сервера
      throw new Error(
        `Failed to search data: ${response.status} ${response.statusText} - ${errorDetails}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching data:", error.message);
    throw error;
  }
};

export {
  sendDataToServer,
  fetchData,
  updateUserOnServer,
  deleteUserFromServer,
  searchDatabase,
};
