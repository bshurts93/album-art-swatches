import React from "react";
import { Button } from "@material-ui/core";
import { login } from "@/api/spotify";

const HomeView = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Button variant="contained" color="primary" onClick={login}>
        Spotify Login
      </Button>
    </div>
  );
};
export default HomeView;
