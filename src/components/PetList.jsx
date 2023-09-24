import React, { useEffect, useState } from 'react';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_API_KEY; // Access the API key from environment variable
  const API_ENDPOINT = 'https://api.petfinder.com/v2/your-endpoint-here';
  const TOKEN_ENDPOINT = 'https://api.petfinder.com/v2/oauth2/token';
  const CLIENT_ID = 'your_client_id_here';
  const CLIENT_SECRET = 'your_client_secret_here';

  // Function to obtain an access token
  const getAccessToken = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    });

    const data = await response.json();
    return data.access_token;
  };

  useEffect(() => {
    // Get the access token first
    getAccessToken().then((accessToken) => {
      fetch(API_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Use the obtained access token
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPets(data.animals); // Assuming the pets are in the 'animals' array
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h2>Available Pets</h2>
      <ul className="list-group">
        {pets.map((pet) => (
          <li key={pet.id} className="list-group-item">
            <h3>{pet.name}</h3>
            <p>Type: {pet.type}</p>
            <p>Breed: {pet.breeds.primary}</p>
            <p>Age: {pet.age}</p>
            <p>Gender: {pet.gender}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PetList;
