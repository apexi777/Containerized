const sendDataToServer = async (formData) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/add_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Failed to submit data');
    }

    const data = await response.json();
    console.log('Data submitted successfully:', data);
    return data;
  } catch (error) {
    console.error('Error submitting data:', error.message);
    throw error;
  }
};

const fetchData = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/get_users');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

const searchDatabase = async (query) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      const errorDetails = await response.text(); // Получаем текст ошибки от сервера
      throw new Error(`Failed to search data: ${response.status} ${response.statusText} - ${errorDetails}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching data:', error.message);
    throw error;
  }
};


export { sendDataToServer, fetchData, searchDatabase };
