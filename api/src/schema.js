const { gql } = require('apollo-server')

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  enum PetType {
    CAT
    DOG
  }

  type User {
    id: ID!
    username: String!
    pets: [Pet]!
  }

  type Pet {
    id: ID!
    createdAt: String!
    name: String!
    type: PetType!
    img: String!
    owner: User!
  }

  input PetInput {
    name: String
    type: PetType 
  }

  input NewPetInput {
    name: String!
    type: PetType!
  }

  type Query {
    user: User!
    pets(input: PetInput): [Pet]!
    pet(input: PetInput): Pet!
  } 

  type Mutation {
    newPet(input: NewPetInput!): Pet!
  }
`;

module.exports = typeDefs
