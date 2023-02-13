import React, { useEffect, useState } from "react";
import EditMovie from "./EditMovie";

const ListMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const deleteMovie = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/v1/movies/${id}`, {
        method: "DELETE",
      }); // index.js, line: 44

      setMovies(movies.filter((movie) => movie.id !== id)); // 1) movies array is updated 2) Updated movies array is rendered on screen on line: 41
    } catch (err) {
      console.error(err.message);
    }
  };

  const getMovies = async () => {
    const res = await fetch("http://localhost:5000/api/v1/movies"); // sends HTTP GET request to index.js, line: 10
    const movieArray = await res.json();
    setMovies(movieArray); // 1) movies array is updated 2) Updated movies array is rendered on screen on line: 41
  };

  return (
    <>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Title</th>
            <th>Summary</th>
            <th>Rating</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.summary}</td>
              <td>{movie.rating}</td>
              <td>
                <EditMovie movie={movie} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteMovie(movie.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListMovies;
