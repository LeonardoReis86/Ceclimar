CREATE DATABASE Ceclimar

DROP TABLE
  IF EXISTS professores;

CREATE TABLE IF NOT EXISTS
  professores (
    id SERIAL PRIMARY KEY NOT NULL,
    nome TEXT,
    turma TEXT,
    quantidade_alunos INTEGER,
    quando_marcado TIMESTAMPTZ,
    para_quando TIMESTAMPTZ
  );

DROP TABLE
  IF EXISTS login_professores;

CREATE TABLE IF NOT EXISTS
  login_professores (
    id SERIAL PRIMARY KEY NOT NULL,
    nome TEXT,
    email TEXT UNIQUE,
    senha TEXT
  );
DROP TABLE
  IF EXISTS login_admin;

CREATE TABLE IF NOT EXISTS
  login_admin (
    id SERIAL PRIMARY KEY NOT NULL,
    nome TEXT,
    email TEXT UNIQUE,
    senha TEXT
  );