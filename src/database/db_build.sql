BEGIN;

DROP TABLE IF EXISTS users, dishes, dietary, connections;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  gitterhandle VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS dishes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  makerID INT REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS dietary (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS connections (
  id SERIAL PRIMARY KEY,
  dish_id INT REFERENCES dishes(id),
  dietary_id INT REFERENCES dietary(id)
);

INSERT INTO users (name, gitterhandle) VALUES ('Natalie', '@njseeto');

INSERT INTO dishes (name, makerID) VALUES ('Vegan Gingerbread People', (SELECT id FROM users WHERE gitterhandle = '@njseeto'));

INSERT INTO dietary (name) VALUES ('Vegan'), ('Nut-free'), ('Vegetarian'), ('Gluten-free'), ('Dairy-free'), ('Halal');

INSERT INTO connections (dish_id, dietary_id) VALUES ((SELECT id FROM dishes WHERE name = 'Vegan Gingerbread People'),(SELECT id FROM dietary WHERE name = 'Vegan')), ((SELECT id FROM dishes WHERE name = 'Vegan Gingerbread People'),(SELECT id FROM dietary WHERE name = 'Nut-free'));

COMMIT;
