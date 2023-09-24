import React, { useState } from 'react';

const PetForm = ({  }) => {
  const [searchCriteria, setSearchCriteria] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchCriteria);
  };

  return (
    <div className="container">
      <h2>Search for Pets</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={searchCriteria.type || ''}
            onChange={handleChange}
          />
        </label>
        {/* Add more input fields for other criteria */}
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default PetForm;

