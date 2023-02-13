import React, { useState } from "react";

const InputMovie = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [rating, setRating] = useState(0.0);

  const handleButtonClicked = async (e) => {
    e.preventDefault();
    try {
      const reqBody = { title, summary, rating };
      await fetch("http://localhost:5000/api/v1/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      }); // index.js, line: 24
      window.location = "/";
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <h1>Input Movie</h1>
      <div className="d-flex flex-column">
        <input
          className="from-control"
          type="text"
          placeholder="Movie title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="from-control"
          type="text"
          placeholder="Movie summary"
          onChange={(e) => setSummary(e.target.value)}
        />
        <input
          className="from-control"
          type="text"
          placeholder="Movie rating"
          onChange={(e) => setRating(e.target.value)}
        />
      </div>
      <button
        className="btn btn-success"
        onClick={(e) => handleButtonClicked(e)}
      >
        Add Movie
      </button>
    </>
  );
};

export default InputMovie;
