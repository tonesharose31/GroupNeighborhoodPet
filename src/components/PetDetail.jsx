import React from 'react';

const PetDetail = ({ pet }) => {
  return (
    <div className="container">
      <h2>{pet.name}</h2>
      <p>Type: {pet.type}</p>
      <p>Breed: {pet.breeds.primary}</p>
      <img  src={pet.primary_photo_cropped.small}
                    alt={pet.name}/>
      {/* Add more details as needed */}
    </div>
  );
};

export default PetDetail;

