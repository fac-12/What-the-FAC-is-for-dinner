BEGIN;

DROP TABLE IF EXISTS users, dishes, dietary, connections;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS dishes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  maker VARCHAR(100) NOT NULL
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

INSERT INTO users (name) VALUES ('Natalie');

INSERT INTO dishes (name, maker) VALUES ('Vegan Gingerbread People', 'Natalie');

INSERT INTO dietary (name) VALUES ('Vegan'), ('Nut-free'), ('Vegetarian'), ('Gluten-free'), ('Dairy-free'), ('Halal');

INSERT INTO connections (dish_id, dietary_id) VALUES ((SELECT id FROM dishes WHERE name = 'Vegan Gingerbread People'),(SELECT id FROM dietary WHERE name = 'Vegan')), ((SELECT id FROM dishes WHERE name = 'Vegan Gingerbread People'),(SELECT id FROM dietary WHERE name = 'Nut-free'));

COMMIT;
