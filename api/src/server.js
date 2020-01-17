const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const cors = require("cors");
const { models, db } = require("./db");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context() {
    const user = db.get("user").value();
    return { models, db, user };
  },
  rootValue() {
    cors: cors;
  },
  introspection: true,
  playground: true
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
