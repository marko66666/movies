CREATE DATABASE pernmovies;

CREATE TABLE movie(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    summary VARCHAR(255),
    rating DECIMAL
);
