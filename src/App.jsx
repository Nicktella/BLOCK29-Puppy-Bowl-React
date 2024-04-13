import React from "react";
import {Routes, Route} from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import AllPlayers from "./components/AllPlayers";
import SinglePlayer from "./components/SinglePlayer";
import NewPlayer from "./components/NewPlayer";

function App() {
  return (
      <>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<AllPlayers />} />
          <Route path="/players/new" element={<NewPlayer />} />
          <Route path="/players/:id" element={<SinglePlayer />} />
        </Routes>
      </>
  );
};

export default App;
