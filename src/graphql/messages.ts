import { gql } from "@apollo/client";

export const GET_MESSAGES = gql(`
  query Messages($first: Int, $after: MessagesCursor, $before: MessagesCursor) {
    messages(first: $first, after: $after, before: $before) {
      edges {
        cursor
        node {
          id
          sender
          status
          text
          updatedAt
          __typename
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`)