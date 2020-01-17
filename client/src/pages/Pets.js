import React, { useState } from "react";
import gql from "graphql-tag";
import PetBox from "../components/PetBox";
import NewPet from "../components/NewPet";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "../components/Loader";
import nanoid from "nanoid";

const PETS_FIELDS = gql`
  fragment PetsFields on Pet {
    id
    name
    type
    img
    vaccinated @client
  }
`;

const ALL_PETS = gql`
  query Pets {
    pets {
      ...PetsFields
    }
  }
  ${PETS_FIELDS}
`;

const NEW_PET = gql`
  mutation CreateAPet($newPet: NewPetInput!) {
    newPet(input: $newPet) {
      ...PetsFields
    }
  }
  ${PETS_FIELDS}
`;

export default function Pets() {
  const [modal, setModal] = useState(false);
  const { data, loading, error } = useQuery(ALL_PETS);
  const [createPet, { data: d, loading: l, error: e }] = useMutation(NEW_PET, {
    update(cache, { data: { newPet } }) {
      const { pets } = cache.readQuery({ query: ALL_PETS });
      cache.writeQuery({
        query: ALL_PETS,
        data: { pets: [newPet, ...pets] }
      });
    }
  });

  const onSubmit = input => {
    createPet({
      variables: { newPet: input },
      optimisticResponse: {
        __typename: "Mutation",
        newPet: {
          __typename: "Pet",
          id: nanoid(),
          type: input.type,
          name: input.name,
          img: "https://via.placeholder.com/300",
          vaccinated: true
        }
      }
    });
    setModal(false);
  };

  if (loading) return <Loader />;
  if (error || e) return "Error!";

  const petsList =
    data &&
    data.pets.map(pet => (
      <div className="col-xs-12 col-md-4 col" key={pet.id}>
        <div className="box">
          <PetBox pet={pet} />
        </div>
      </div>
    ));

  if (modal) {
    return (
      <div className="row center-xs">
        <div className="col-xs-8">
          <NewPet onSubmit={onSubmit} onCancel={() => setModal(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <div className="row">{petsList}</div>
      </section>
    </div>
  );
}
