const { ApolloServer, gql } = require('apollo-server');

// Schéma GraphQL
const typeDefs = gql`
  type Line {
    id: ID!
    name: String!
    type: String!
    stations: [String!]!
  }

  type Query {
    lines: [Line!]!
    line(id: ID!): Line
  }

  type Mutation {
    addLine(name: String!, type: String!, stations: [String!]!): Line
    updateLine(id: ID!, name: String, type: String, stations: [String!]): Line
    deleteLine(id: ID!): Line
  }
`;

// Données mockées
let lines = [
  { id: "1", name: "Ligne A", type: "bus", stations: ["A", "B", "C"] },
  { id: "2", name: "Ligne B", type: "metro", stations: ["X", "Y", "Z"] }
];

// Résolveurs
const resolvers = {
  Query: {
    lines: () => lines,
    line: (_, { id }) => lines.find(l => l.id === id)
  },
  Mutation: {
    addLine: (_, { name, type, stations }) => {
      const newLine = { id: (lines.length + 1).toString(), name, type, stations };
      lines.push(newLine);
      return newLine;
    },
    updateLine: (_, { id, name, type, stations }) => {
      const line = lines.find(l => l.id === id);
      if (!line) return null;
      if (name) line.name = name;
      if (type) line.type = type;
      if (stations) line.stations = stations;
      return line;
    },
    deleteLine: (_, { id }) => {
      const index = lines.findIndex(l => l.id === id);
      if (index === -1) return null;
      return lines.splice(index, 1)[0];
    }
  }
};

// Créer le serveur Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT).then(({ url }) => {
  console.log(`CityGraph GraphQL service listening on ${url}`);
});
