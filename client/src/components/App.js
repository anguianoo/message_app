import React, { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import Navbar from "./Navbar";
import ShowRoom from "./ShowRoom";

function App({ cableApp }) {
  // const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({
    room: {},
    users: [],
    messages: [],
  });
  const [messages, setMessages] = useState(null);

  // error handle
  // login condition

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setCurrentUser(user));
      }
    });

    fetch("/users")
      .then((r) => r.json())
      .then((users) => {
        setAllUsers(users);
      });
  }, []);

  function handleSignups(newUser) {
    setAllUsers({ ...allUsers, newUser });
  }

  function updateAppStateRoom(newRoom) {
    setCurrentRoom({
      ...currentRoom,
      room: newRoom,
      users: newRoom.users,
      messages: newRoom.messages,
    });
    setMessages(newRoom.messages);
  }

  function handleUpdateCurrentUser(user) {
    setCurrentUser(user);
  }

  function handleCurrentRoom(result) {
    return {
      room: result,
      users: result.users,
      messages: result.messages,
    };
  }

  function getRoomData(id) {
    fetch(`/rooms/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setCurrentRoom(() => handleCurrentRoom(result));
      });
  }

  return (
    <div className="App">
      <Navbar setUser={setCurrentUser} user={currentUser} />
      <Routes>
        <Route
          path="/"
          element={<Home user={currentUser} setUser={setCurrentUser}></Home>}
        />
        <Route path="/signup" element={<SignUp onSignup={handleSignups} />} />
        <Route
          path="/login"
          element={<Login onLogin={handleUpdateCurrentUser} />}
        />
        {/* <Route path="/disclaimer" element={<Disclaimer />} /> */}
        {currentUser && (
          <Route
            path={currentUser ? "/rooms/:id" : "/login"}
            element={
              <ShowRoom
                users={allUsers}
                cableApp={cableApp}
                updateApp={updateAppStateRoom}
                getRoomData={getRoomData}
                roomData={currentRoom}
                currentUser={currentUser}
                messages={messages}
                handleMessageUpdate={setMessages}
              />
            }
          />
        )}
      </Routes>
    </div>
  );
}

export default App;
