import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
  Container,
  Paper,
  InputBase,
  IconButton,
  InputAdornment,
  Grid,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import RoomWebSocket from "./RoomWebSocket";
import Chatfeed from "./Chatfeed";

export default function ShowRoom({
  currentUser,
  cableApp,
  updateApp,
  getRoomData,
  messages,
  handleMessageUpdate,
  roomData,
  users,
}) {
  const [newMessage, setNewMessage] = useState("");
  const [getData, setGetData] = useState("");
  const roomId = window.location.href.match(/\d+$/)[0];
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/rooms/${roomId}`)
      .then((resp) => resp.json())
      .then((res) => {
        setGetData(res);
        handleMessageUpdate(res.messages);
      });
  }, []);

  function whichUser(message) {
    const user = roomData.users.find((x) => parseInt(x.id) === message.user_id);
    return user;
  }

  function displayMessages(messages) {
    return messages.map((msg) => {
      const user = whichUser(msg);
      // console.log(user);

      return msg.message_body !== null ? (
        <Chatfeed
          key={msg.id}
          room={roomData}
          user={user}
          onDeleteMessage={handleDeleteClick}
          onUpdateMessage={handleUpdateMessage}
          currentUser={currentUser}
          allUsers={users}
          message={msg}
        />
      ) : (
        <div></div>
      );
    });
  }

  function handleUpdateMessage(updatedMessageObj) {
    const updatedMessages = messages.map((message) => {
      if (message.id === updatedMessageObj.id) {
        return updatedMessageObj;
      } else {
        return message;
      }
    });
    handleMessageUpdate(updatedMessages);
  }

  function handleDeleteClick(id) {
    fetch(`/messages/${id}`, {
      method: "DELETE",
    });

    const updatedMessages = messages.filter((message) => message.id !== id);
    handleMessageUpdate(updatedMessages);
  }

  function handleGoBack() {
    navigate("/");
  }

  const messageData = {
    message_body: newMessage,
    user_id: currentUser.id,
    room_id: roomId,
  };

  function handleSendMessage(e) {
    e.preventDefault();
    setNewMessage("");
    fetch("/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(messageData),
    })
      .then((r) => r.json())
      .then((data) => {
        let messageDiv = document.getElementById("messages");
        messageDiv.scrollTop = messageDiv.scrollHeight;
      });
  }

  return (
    <>
      <Button onClick={handleGoBack}>Back</Button>
      <Container>
        <Grid container spacing={2}>
          <Grid>
            <Typography variant="h2" sx={{ textDecoration: "underline" }}>
              {roomData.room.name}
            </Typography>
          </Grid>
          <Grid></Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg">
        <Container
          maxWidth="lg"
          sx={{ mb: 4 }}
          // style={{ backgroundColor: "#f1f1f1" }}
        >
          <div id="messages" className="">
            {messages !== null ? (
              displayMessages(messages)
            ) : (
              <Typography variant="h3">No Messages yet</Typography>
            )}
          </div>
        </Container>

        <TextField
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SendIcon onClick={handleSendMessage} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Container>
      <RoomWebSocket
        cableApp={cableApp}
        updateApp={updateApp}
        getRoomData={getRoomData}
        roomData={roomData}
      />
    </>
  );
}
