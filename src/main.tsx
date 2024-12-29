import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Chat } from "./chat.tsx";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/client.ts";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const wsLink = new GraphQLWsLink(createClient({

  url: 'ws://localhost:4000/subscriptions',

}));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Chat />
    </ApolloProvider>
  </StrictMode>
);
