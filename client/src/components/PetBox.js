import React from 'react'

const PetBox = ({pet}) => (
  <div className="pet">
    <figure>
      <img src={pet.img + `?pet=${pet.id}`} alt=""/>
    </figure>
    <div className="pet-name">{pet.name}</div>
    <div className="pet-type">{pet.type}</div>
    <div className="pet-isVaccinated">{`Vaccinated: ${pet.vaccinated ? 'Y' : 'N'}`}</div>
  </div>
)

export default PetBox
