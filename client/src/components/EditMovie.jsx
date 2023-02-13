import React, { useState } from "react";

const EditMovie = ({ movie }) => {
  const [title, setTitle] = useState(movie.title);
  const [summary, setSummary] = useState(movie.summary);
  const [rating, setRating] = useState(movie.rating);

  const editMovie = async (id) => {
    try {
      const body = { title, summary, rating };
      await fetch(`http://localhost:5000/api/v1/movies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }); // index.js, line: 32
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleModalOperation = () => {
    setTitle(movie.title);
    setSummary(movie.summary);
    setRating(movie.rating);
  };

  return (
    <>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${movie.id}`}
      >
        Edit
      </button>

      <div
        class="modal"
        id={`id${movie.id}`}
        onClick={() => handleModalOperation()}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Movie</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => handleModalOperation()}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>
            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={() => editMovie(movie.id)}
              >
                Edit
              </button>

              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => handleModalOperation()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMovie;
