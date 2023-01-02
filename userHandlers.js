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

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
};
