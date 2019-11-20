/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

//  Here we're getting "models" from "ctx" (context)
// The second value is the "user's arguments", which should always be "input" if I follow Scott's advice

module.exports = {
  Query: {
    user(_, __, { models }) {
      return models.User.findOne()
    },
    pets(_, { input }, { models }) {
      return models.Pet.findMany(input)
    },
    pet(_, { input }, { models }) {
      return models.Pet.findOne(input)
    }
  },
  Mutation: {
    newPet(_, { input }, { models }) {
      return models.Pet.create(input)
    }
  },
  Pet: {
    img(pet) {
      return pet.type === 'DOG'
        ? 'https://placedog.net/300/300'
        : 'http://placekitten.com/300/300'
    },
    owner(_, __, { models }) {
      return models.User.findOne()
    },
  },
  User: {
    pets(user, _, { models }) {
      return models.Pet.findMany({ owner: user.id })
    }
  }
}
