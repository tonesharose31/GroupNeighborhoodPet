import React, { useEffect, useState } from 'react';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_API_KEY; 
  const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
  const API_ENDPOINT = 'https://api.petfinder.com/v2/animals?type=dog&page=4';
  const TOKEN_ENDPOINT = 'https://api.petfinder.com/v2/oauth2/token';

  const getAccessToken = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${CLIENT_SECRET}`,
    });

    const data = await response.json();
    return data.access_token;
  };

  useEffect(() => {
    getAccessToken().then((accessToken) => {
      fetch(API_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${accessToken}`, 
        }, 
      })
        .then((response) => response.json())
        .then((data) => {
          setPets(data.animals); 
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    });
  }, [API_KEY, CLIENT_SECRET]); 

  if (loading) {
    return <p>Doggy_Loading...</p>;
  }

  if (!pets || pets.length === 0) {
    return <p>No pets found.</p>;
  }

  return (
    <div className="container">
      <h2>Available Pets</h2>
      <ul className="list-group">
        {pets.map((pet) => (
          <li key={pet.id} className="list-group-item">
            <div className="row">
              <div className="col-md-4">
                {pet.primary_photo_cropped ? (
                  <img
                    src={pet.primary_photo_cropped.small}
                    alt={pet.name}
                    className="img-fluid rounded"
                  />
                ) : (
                  <p>No photo available</p>
                )}
              </div>
              <div className="col-md-8">
                <h3>{pet.name}</h3>
                <p>Type: {pet.type}</p>
                <p>Breed: {pet.breeds.primary}</p>
                <p>Age: {pet.age}</p>
                <p>Gender: {pet.gender}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PetList;
