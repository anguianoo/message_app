import React, { useEffect } from "react";

export default function RoomWebSocket({ getRoomData, cableApp, updateApp }) {
  useEffect(() => {
    getRoomData(window.location.href.match(/\d+$/)[0]);
    cableApp.room = cableApp.cable.subscriptions.create(
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
