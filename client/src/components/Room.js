import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Room({ rooms }) {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [roomName, changeRoomName] = useState();

  const navigate = useNavigate();

  function handleNavigation() {
    navigate(`/rooms/${rooms.id}`);
  }

  function handleEditRoomName() {
    const data = {
      name: roomName,
      is_private: false,
    };

    fetch(`/rooms/${rooms.id}`, {
      method: "PATCH",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((data) => console.log(roomName));
    handleClose();
  }

  function handleDeleteRoom() {
    // console.log("delete");
    fetch(`/rooms/${rooms.id}`, {
      method: "DELETE",
    });
  }

  return (
    <>
      <Button onClick={handleNavigation}>{rooms.name}</Button>
      <IconButton onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleDeleteRoom}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="roomName"
            label="Edit Room Name"
            type="text"
            fullWidth
            variant="standard"
            value={roomName}
            onChange={(e) => changeRoomName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditRoomName}>Edit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
