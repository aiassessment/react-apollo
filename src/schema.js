const { gql } = require("apollo-server");

const typeDefs = gql`
  type Link {
    id: Int!
    url: String!
    slut: String
  }

  type Query {
    link(slug: string!): Link
    allLinks()
  }

  type Mutation {
    createLink(url: String!, slug: String): Link!
  }
`;

module.exports = typeDefs;
