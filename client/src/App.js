import React from "react";
import InputMovie from "./components/InputMovie";
import ListMovies from "./components/ListMovies";
import SearchMovies from "./components/SearchMovies";
import "./App.css";

function App() {
  return (
    <>
      <InputMovie />
      <SearchMovies />
      <ListMovies />
    </>
  );
}

export default App;
