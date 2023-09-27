import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PetList from './components/PetList';
import PetForm from './components/PetForm';

const updatePets = async (searchParams, accessToken, setPets, setLoading) => {
  setLoading(true);
  const searchParamsString = new URLSearchParams(searchParams).toString();
  const apiURL = `https://api.petfinder.com/v2/animals?type=dog&${searchParamsString}`;

  try {
    const response = await fetch(apiURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    
    if (response.ok) {
      const data = await response.json();
      setPets(data.animals);
    } else {
      // handle errors
    }
  } catch (error) {
    // Handle errors
  } finally {
    setLoading(false);
  }
};

const App = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/search"
          element={<PetForm updatePets={updatePets} setPets={setPets} setLoading={setLoading} />}
        />
      </Routes>

      <div>
        <h1>Doggy Pal Adoption</h1>
        <PetForm updatePets={updatePets} setPets={setPets} setLoading={setLoading} />
        <PetList pets={pets} loading={loading} />
      </div>
    </Router>
  );
};

export default App;



