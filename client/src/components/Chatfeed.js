import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import "./chat-feed.css";
export default function Chatfeed({
  currentUser,
  room,
  allUsers,
  user,
  message,
  onUpdateMessage,
  onDeleteMessage,
}) {
  const timestamp = new Date(message.created_at).toLocaleTimeString();

  // console.log(message.user_id, "message.user_id");
  // console.log(currentUser.id, "current.id");

  const messageBubble = () => {
    if (message.user_id === parseInt(currentUser.id)) {
      return "current-user-message-text user-message-container";
    } else {
      return "other-user-message-text user-message-container";
    }
  };
  const whichUser = () => {
    if (message.user_id === parseInt(currentUser.id)) {
      return "current-user-message";
    } else {
      return "other-user-message";
    }
  };
  // console.log(user);
  return (
    <div className="chat-feed-container">
      <div id="chat-message" className={whichUser()}>
        {user !== undefined && (
          <>
            <Typography style={{ fontSize: "8px" }}>{user.username}</Typography>
            <img
              className="image"
              src="https://yorktonrentals.com/wp-content/uploads/2017/06/usericon.png"
              alt="avatar"
            />
          </>
        )}
        <div className="user">
          <p className={messageBubble()}>{message.message_body}</p>
          {timestamp !== "Invalid Date" ? (
            <i style={{ fontSize: "10px" }}>{timestamp}</i>
          ) : (
            <i style={{ fontSize: "10px" }}>Edited</i>
          )}
        </div>
      </div>
    </div>
  );
}
