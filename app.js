require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome)

const validators = require("./validators");
const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.post("/api/movies", validators.validateMovie);
app.put("/api/movies/:id", validators.validateMovie);
app.get("/api/movies/?color", movieHandlers.getMoviesByColor);
app.get("/api/movies/?max_duration=150", movieHandlers.getMoviesByDuration);
app.get("/api/movies/?max_duration=150&color=0", movieHandlers.getMoviesByDurationAndColor);

const userHandlers = require("./userHandlers");

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.post("/api/users", userHandlers.postUser);
app.put("/api/users/:id", userHandlers.updateUser);
app.delete("/api/users/:id", userHandlers.deleteUser);
app.post("/api/users", validators.validateUser);
app.put("/api/users/:id", validators.validateUser);
app.get("/api/users/?language=English", userHandlers.getUserByLanguage); 
app.get("/api/users/?language=English", userHandlers.getUserByCity);
app.get("/api/users/?language=English", userHandlers.getUserByLanguageAndCity);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
const { validateMovie } = require("./validators.js");
  
app.post("/api/movies", validateMovie, movieHandlers.postMovie);


