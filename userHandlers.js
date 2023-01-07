const users = [
  {
    id: 1,
    firstname: "Najim",
    lastname: "Kebdani",
    email: "najim.kebdani@gmail.com",
    city: "Toulouse",
    language: "French"
  },
  {
    id: 2,
    firstname: "Stéphanie",
    lastname: "Malbert",
    email: "stephanie.malbert@live.fr",
    city: "Toulouse",
    language: "French"
  }
]

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find((user) => user.id === id);

  if (users != null) {
    res.json(users);
  } else {
    res.status(404).send("Not Found");
  }
};

const postUser = (req, res) => {
  database
    .query(
      "INSERT INTO users (id, firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?, ?,)",
      [id, firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);

  const { firstname, lastname, email, city, language } = req.body;

  database

    .query(
      "update user set (firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?)",

      [id, firstname, lastname, email, city, language]
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

      res.status(500).send("Error editing the user");
    });
};
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  database
   .query("delete from users where id =?", [id])
   .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else { 
        res.sendStatus(204);
      }
    });
  };

const getUserByLanguage = (req, res) => {
  let sql = "select * from users";
  const sqlValues = [];
  
  if (req.query.language != null) {
    sql += " where language = English";
    sqlValues.push(req.query.language);
  }
};
const getUserByCity = (req, res) => {
  let sql = "select * from users";
  const sqlValues = [];
  
  if (req.query.city != null) {
    sql += " where language = English";
    sqlValues.push(req.query.city);
  }
};
const getUserByLanguageAndCity = (req, res) => {
  let sql = "select * from users";
  const sqlValues = [];

  if (req.query.language != null) {
    sql += " where language = English";
    sqlValues.push(req.query.language);

    if (req.query.city !=null) {
      sql += " where city = Paris";
      sqlValues.push(req.query.city)
    }
  } else if ((req.query.language != "English") && (req.query.city != "Paris"));
}


module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser, 
  getUserByCity,
  getUserByLanguage,
  getUserByLanguageAndCity
};
