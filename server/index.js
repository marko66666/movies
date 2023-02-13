const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.get("/api/v1/movies", async (req, res) => {
  try {
    const allMovies = await pool.query("SELECT * FROM movie");
    res.status(200).json(allMovies.rows); // ListMovies.jsx, line: 24
  } catch (err) {
    res.status(503); // ListMovies.jsx, line: 24
  }
});

app.get("/api/v1/movies/search", async (req, res) => {
  try {
    const { term } = req.query;

    const movies = await pool.query(
      "SELECT * FROM movie WHERE title || summary || rating LIKE $1",
      [`%${term}%`]
    );

    res.json(movies.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/api/v1/movies", async (req, res) => {
  try {
    const { title, summary, rating } = req.body;
    const newMovie = await pool.query(
      "INSERT INTO movie (title, summary, rating) VALUES ($1,$2,$3) RETURNING *",
      [title, summary, rating]
    );
    res.status(201).json(newMovie.rows[0]); // InputMovie.jsx, line: 12
  } catch (err) {
    res.status(503); // InputMovie.jsx, line: 12
  }
});

app.put("/api/v1/movies/:id", async (req, res) => {
  try {
    const updatedMovie = await pool.query(
      "UPDATE movie SET title = $1, summary = $2, rating = $3 WHERE id = $4 RETURNING *",
      [req.body.title, req.body.summary, req.body.rating, req.params.id]
    );
    res.status(200).json(updatedMovie.rows[0]); // EditMovie.jsx, line: 11
  } catch (err) {
    res.status(503); // EditMovie.jsx, line: 11
  }
});

app.delete("/api/v1/movies/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM movie WHERE id = $1", [req.params.id]);
    res.status(200).json("deleted"); // ListMovies.jsx, line: 13
  } catch (err) {
    res.status(503); // ListMovies.jsx, line: 13
  }
});

app.listen(5000, () => {
  console.log("Server is starting on port 5000");
});
