
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
    {
      id: 4,
      title:"Whiplash", 
      director :"Damien Chazelle", 
      year:"2014", 
      color:true, 
      duration:107
    },
    {
      id: 5,
      title: "Titanic",
      director: "James Cameron",
      year: "1997",
      color: true,
      duration: 194
    },
    {
      id: 6,
      title: "Roméo et Juliette",
      director: "Baz Luhrmann",
      year: "1996",
      color: true,
      duration: 194
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

    database
    .query(
      "SHOW movies(id)",
      [ title, director, year, color, duration ]
    )
    .then(([result]) => {
      // wait for it
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error loading the movie");
    });
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
  const updateMovie = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, director, year, color, duration } = req.body;
  
    database
      .query(
        "update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?",
        [title, director, year, color, duration, id]
      )
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error editing the movie");
      });
    };
    const getMoviesByColor = (req, res) => {
      let sql = "select * from movies";
      const sqlValues = [];
    
      if (req.query.color != null) {
        sql += " where color = ?";
        sqlValues.push(req.query.color);
      }
      database
        .query("select * from movies")
        .then(([movies]) => {
          res.json(movies);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("Error retrieving data from database");
        });
    };

    const getMoviesByDuration = (req, res) => {
      let sql = "select * from movies";
      const sqlValues = [];
    
      if (req.query.max_duration != null){
        sql += " where duration <= 150";
        sqlValues.push(req.query.max_duration);
      }
    
      database
        .query(sql, sqlValues)
        .then(([movies]) => {
          res.json(movies);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("Error retrieving data from database");
        });
    };
    
    const getMoviesByDurationAndColor = (req, res) => {
      let sql = "select * from movies";
      const sqlValues = [];
      
      if (req.query.color != null) {
        sql += " where color = ?";
        sqlValues.push(req.query.color);
      
        if (req.query.max_duration != null) {
          sql += " and duration <= 150";
          sqlValues.push(req.query.max_duration);
        }
      } else if (req.query.max_duration != null) {
        sql += " where duration >= 150";      
      }
    
      database
        .query(sql, sqlValues)
        .then(([movies]) => {
          res.json(movies);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("Error retrieving data from database");
        });
    };
  
  module.exports = {
    getMovies,
    getMovieById,
    postMovie,
    updateMovie,
    getMoviesByColor,
    getMoviesByDuration,
    getMoviesByDurationAndColor
  };
  