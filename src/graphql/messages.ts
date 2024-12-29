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

export const SEND_MESSAGE = gql(`
  mutation SendMessage($text: String!) {
    sendMessage(text: $text) {
      status
      id
      sender
      text
      updatedAt
      __typename
    }
  }
`)

export const MESSAGE_ADDED = gql(`
  subscription MessageAdded {
    messageAdded {
      id
      sender
      status
      text
      updatedAt
    }
  }
`)

export const MESSAGE_UPDATED = gql(`
  subscription MessageUpdated {
    messageUpdated {
      id
      sender
      status
      text
      updatedAt
    }
  }
`)