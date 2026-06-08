-- pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS recipes (
  id           SERIAL PRIMARY KEY,
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  description  TEXT NOT NULL DEFAULT '',
  tags         TEXT[] NOT NULL DEFAULT '{}',
  prep_minutes INT NOT NULL DEFAULT 0,
  cook_minutes INT NOT NULL DEFAULT 0,
  image_url    TEXT,
  ingredients  TEXT[] NOT NULL DEFAULT '{}',
  steps        TEXT[] NOT NULL DEFAULT '{}',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  username      TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
