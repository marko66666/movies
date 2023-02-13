import React, { useState } from "react";

function SearchMovies() {
  const [term, setMovieSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/movies/search?term=${term}`
      );

      const parseResponse = await response.json();

      setMovies(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="container text-center">
        <form className="d-flex" onSubmit={onSubmitForm}>
          <input
            type="text"
            name="name"
            placeholder="Enter movie ..."
            className="form-control"
            value={term}
            onChange={(e) => setMovieSearchTerm(e.target.value)}
          ></input>
          <button className="btn btn-success">Submit</button>
        </form>
        <table className="table my-5">
          <thead>
            <tr>
              <th>Title</th>
              <th>Summary</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>{movie.summary}</td>
                <td>{movie.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {movies.length === 0 ? <p>No Results Found</p> : null}
      </div>
    </>
  );
}

export default SearchMovies;
