import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3005/graphql', // URL do backend GraphQL
  cache: new InMemoryCache(),
});

export { client, gql };
