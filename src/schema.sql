CREATE DATABASE Ceclimar

DROP TABLE
  IF EXISTS agendamento_aulas;

CREATE TABLE IF NOT EXISTS
  agendamento_aulas (
    id SERIAL PRIMARY KEY NOT NULL,
    id_professor INTEGER REFERENCES cadastro_professores (id),
    turma TEXT,
    quantidade_alunos INTEGER,
    quando_marcado TIMESTAMPTZ,
    para_quando TIMESTAMPTZ
  );

DROP TABLE
  IF EXISTS cadastro_professores;

CREATE TABLE IF NOT EXISTS
  cadastro_professores (
    id SERIAL PRIMARY KEY NOT NULL,
    nome TEXT,
    email TEXT UNIQUE,
    senha TEXT
  );
DROP TABLE
  IF EXISTS cadastro_admin;

CREATE TABLE IF NOT EXISTS
  cadastro_admin (
    id SERIAL PRIMARY KEY NOT NULL,
    nome TEXT,
    email TEXT UNIQUE,
    senha TEXT
  );
