import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { AppBar, Button, Menu, Toolbar, Typography } from "@mui/material";
import { Box, Container, ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";

const style = {
  textDecoration: "none",
  color: "white",
  userName: {
    color: "black",
  },
};

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate("/");
  function handleLogout() {
    fetch("/logout", {
      method: "delete",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
        navigate("/");
      }
    });
  }
  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="x1">
          <Toolbar disableGutters>
            <Typography component="div" style={{ marginRight: "10px" }}>
              <Link to="/" style={style}>
                Home
              </Link>
            </Typography>
            {user != null ? (
              <>
                <Typography style={{ marginRight: "10px" }}>Hi!</Typography>
                <Typography style={style.userName}>
                  {user.username.toUpperCase()}
                </Typography>

                <Button style={style} onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Typography style={style}>
                {" "}
                <Link exact to="/signup" style={style}>
                  Sign up
                </Link>{" "}
                <Link exact to="/login" style={style}>
                  Login
                </Link>
              </Typography>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
