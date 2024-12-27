import React, { useEffect, useState } from "react";
import { ItemContent, Virtuoso } from "react-virtuoso";
import cn from "clsx";
import {
  MessageEdge,
  MessageSender,
  MessageStatus,
  type Message,
} from "../__generated__/resolvers-types";
import css from "./chat.module.css";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_MESSAGES, SEND_MESSAGE } from "./graphql/messages";


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

  const [getMessages] = useLazyQuery(GET_MESSAGES);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSend = async () => {

  }


  useEffect(() => {
    const getMessageFunc = async () => {
      const output = await getMessages();
      const messageList = output.data.messages.edges.map((message:MessageEdge) => message.node);
      setMessagesList(messageList);
      
      return messageList;
    } 

    getMessageFunc();
  }, []);


  return (
    <div className={css.root}>
      <div className={css.container}>
        <Virtuoso className={css.list} data={messagesList} itemContent={getItem} />
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
