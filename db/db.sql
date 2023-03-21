CREATE TYPE gender AS ENUM ('M', 'F');

CREATE TABLE cats (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
  name TEXT NOT NULL,
  img_url TEXT,
  bio TEXT NOT NULL DEFAULT '',
  birthdate DATE NOT NULL,
  gender gender NOT NULL
)

