import React, { useEffect, useState } from "react";
import { ItemContent, Virtuoso } from "react-virtuoso";
import cn from "clsx";
import {
  MessageEdge,
  MessagePageInfo,
  MessageSender,
  MessageStatus,
  type Message,
} from "../__generated__/resolvers-types";
import css from "./chat.module.css";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_MESSAGES, SEND_MESSAGE } from "./graphql/messages";
import { after } from "node:test";


const Item: React.FC<Message> = ({ text, sender }) => {
  return (
    <div className={css.item}>
      <div
        className={cn(
          css.message,
          sender === MessageSender.Admin ? css.out : css.in
        )}
      >
        {text}
      </div>
    </div>
  );
};

const getItem: ItemContent<Message, unknown> = (_, data) => {
  return <Item {...data} />;
};

export const Chat: React.FC = () => {

  const [messagesList, setMessagesList] = useState<Message[]>([]);
  const [textInputValue, setTextInputValue] = useState<string>('');
  const [pageInfo, setPageInfo] = useState<MessagePageInfo>({});

  const [getMessages] = useLazyQuery(GET_MESSAGES);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSend = async () => {

  }

  const getMessageFunc = async (filter?: {}) => {
    const output = await getMessages({variables: filter});
    console.log('output', output)
    const messageList = output.data.messages.edges.map((message:MessageEdge) => message.node);
    setMessagesList([...messagesList, ...messageList]);
    setPageInfo(output.data.messages.pageInfo)
    return messageList;
  } 

  useEffect(() => {
    getMessageFunc();
  }, []);


  return (
    <div className={css.root}>
      <div className={css.container}>
        <Virtuoso 
          className={css.list}
          data={messagesList}
          itemContent={getItem} 
          endReached={() => {
            if (pageInfo.hasNextPage) {
              getMessageFunc({after: `${pageInfo.endCursor}`})
            }
          }}
        />
      </div>
      <div className={css.footer}>
        <input
          type="text"
          value={textInputValue}
          onChange={e => {
            setTextInputValue(e.target.value);
          }}
          className={css.textInput}
          placeholder="Message text"
        />
        <button>Send</button>
      </div>
    </div>
  );
};
