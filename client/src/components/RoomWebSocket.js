import React, { useEffect, useContext } from "react";
import { CableContext } from "./CableContext";

export default function RoomWebSocket({ getRoomData, cableApp, updateApp }) {
  const cable = useContext(CableContext);

  useEffect(() => {
    getRoomData(window.location.href.match(/\d+$/)[0]);
    cable.room = cable.cable.subscriptions.create(
      {
        channel: "RoomsChannel",
        room: window.location.href.match(/\d+$/)[0],
      },
      {
        received: (updatedRoom) => {
          updateApp(updatedRoom);
        },
      }
    );
  }, []);

  return <div></div>;
}
