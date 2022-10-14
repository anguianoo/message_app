import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Backdrop,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
} from "@mui/material";
// import ShowRoom from "./ShowRoom";
import Room from "./Room";
import { useNavigate } from "react-router-dom";

export default function RoomCreator() {
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  function handleCreateRoom(e) {
    e.preventDefault();

    fetch("/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        is_private: false,
      }),
    })
      .then((r) => r.json())
      .then((room) => {
        setName(room);
        navigate(`/rooms/${room.id}`);
      });

    // console.log("Room Created:", name);
    handleClose();
  }

  if (!rooms) {
    return (
      <>
        <Button onClick={handleOpen}>Create a room</Button>

        <h1>No Rooms</h1>
      </>
    );
  } else
    return (
      <>
        <Button onClick={handleOpen}>Create a room</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Input Room Name</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Room Name"
              type="email"
              fullWidth
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreateRoom}>Create</Button>
          </DialogActions>
        </Dialog>
      </>
    );
}
