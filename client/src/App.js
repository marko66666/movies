import React from "react";
import InputMovie from "./components/InputMovie";
import ListMovies from "./components/ListMovies";
import SearchMovies from "./components/SearchMovies";
import "./App.css";
import ListAndSearchMovies from "./components/ListAndSearchMovies";

function App() {
  return (
    <>
      <InputMovie />
      <ListAndSearchMovies />
    </>
  );
}

export default App;
