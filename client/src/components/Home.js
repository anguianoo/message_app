import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import RoomCreator from "./RoomCreator";
import Room from "./Room";

export default function Home({ user, setUser }) {
  const navigate = useNavigate();
  const [authenticated, setauthenticated] = useState(null);
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    fetch("/rooms")
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw new Error("rooms not populating due to not being logged in");
      })
      .then((rooms) => setRoomData(rooms));
  }, []);

  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return user ? (
    <>
      <RoomCreator />

      {roomData.map((room) => (
        <Grid
          key={room.id}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid key={room.id} item xs={6}>
            <Room key={room.id} rooms={room} />
          </Grid>
        </Grid>
      ))}
    </>
  ) : (
    <>
      <Typography variant="h3">Welcome, please login or sign up!</Typography>
    </>
  );
}
