import React, { useState,} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PetForm = ({ updatePets, accessToken }) => {
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [location, setLocation] = useState('');
  const [geolocation, setGeolocation] = useState({ lat: null, lon: null });

  const getGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setGeolocation({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const searchParams = {};
  
    if (petName) {
      searchParams.name = petName;
    }
  
    if (breed) {
      searchParams.breed = breed;
    }
  
    if (location) {
      searchParams.location = location;
    }
  
    if (geolocation.lat && geolocation.lon) {
      searchParams.lat = geolocation.lat;
      searchParams.lon = geolocation.lon;
    }
  
    const queryString = new URLSearchParams(searchParams).toString();
  
    const apiURL = `https://api.petfinder.com/v2/animals?${queryString}`;
  
    try {
      const response = await fetch(apiURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        updatePets(data.animals);
      } else {
        console.error('API request failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  return (
    <div className="container">
      <h2>Search for a Pet</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="petName" className="form-label">Pet Name</label>
          <input
            type="text"
            className="form-control"
            id="petName"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="breed" className="form-label">Breed</label>
          <input
            type="text"
            className="form-control"
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={getGeolocation}>
          Use My Location
        </button>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
    </div>
  );
};

export default PetForm;





