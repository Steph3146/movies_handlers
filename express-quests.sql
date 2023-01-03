DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
  id int primary key NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  director varchar(255) NOT NULL,
  year varchar(255) NOT NULL,
  color varchar(255) NOT NULL,
  duration int NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

INSERT INTO
  movies (title, director, year, color, duration)
VALUES
  (
    'Citizen Kane',
    'Orson Wells',
    '1941',
    '0',
    120
  ),
  (
    'The Godfather',
    'Francis Ford Coppola',
    '1972',
    '1',
    180
  ),
  (
    'Pulp Fiction',
    'Quentin Tarantino',
    '1994',
    '1',
    180
  ),
  (
    'Whiplash',
    'Damien Chazelle',
    '2014',
    '1',
    107
  ),
  (
    'Titanic',
    'James Cameron',
    '1997',
    '1',
    194
  ),
  (
    'Roméo et Juliette',
    'Baz Luhrmann',
    '1996',
    '1',
    194
  );

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id int primary key NOT NULL AUTO_INCREMENT,
    firstname varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    city varchar(255) DEFAULT NULL,
    language varchar(255) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO
  users (firstname, lastname, email, city, language)
VALUES
  (
    'John',
    'Doe',
    'john.doe@example.com',
    'Paris',
    'English'
  ),
  (
    'Valeriy',
    'Appius',
    'valeriy.appius@example.com',
    'Moscow',
    'Russian'
  ),
  (
    'Ralf',
    'Geronimo',
    'ralf.geronimo@example.com',
    'New York',
    'Italian'
  ),
  (
    'Maria',
    'Iskandar',
    'maria.iskandar@example.com',
    'New York',
    'German'
  ),
  (
    'Jane',
    'Doe',
    'jane.doe@example.com',
    'London',
    'English'
  ),
  (
    'Johanna',
    'Martino',
    'johanna.martino@example.com',
    'Milan',
    'Spanish'
  );
