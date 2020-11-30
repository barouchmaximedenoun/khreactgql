import { ApolloClient, InMemoryCache } from "@apollo/client";
export const client = new ApolloClient({
 uri: "https://capital-mastodon-23.hasura.app/v1/graphql",
 cache: new InMemoryCache(),
});