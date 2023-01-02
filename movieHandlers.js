
const movies = [
    {
      id: 1,
      title: "Citizen Kane",
      director: "Orson Wells",
      year: "1941",
      colors: false,
      duration: 120,
    },
    {
      id: 2,
      title: "The Godfather",
      director: "Francis Ford Coppola",
      year: "1972",
      colors: true,
      duration: 180,
    },
    {
      id: 3,
      title: "Pulp Fiction",
      director: "Quentin Tarantino",
      year: "1994",
      color: true,
      duration: 180,
    },
    {id: 4,
      title:"Whiplash", 
      director :"Damien Chazelle", 
      year:"2014", 
      color:true, 
      duration:107
    }
  ];
  
  const database = require("./database");
  
  const getMovies = (req, res) => {
    database
      .query("select * from movies")
      .then(([movies]) => {
        if (movies[0] != null) {
          res.json(movies);
        } else {
          res.status(404).send("Not Found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };
  
  const getMovieById = (req, res) => {
    const id = parseInt(req.params.id);
  
    const movie = movies.find((movie) => movie.id === id);
  
    if (movie != null) {
      res.json(movie);
    } else {
      res.status(404).send("Not Found");
    }
  };
  
  const postMovie = (req, res) => {
    const { title, director, year, color, duration } = req.body;
    database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      // wait for it
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
  };
  
  module.exports = {
    getMovies,
    getMovieById,
    postMovie,
  };
  