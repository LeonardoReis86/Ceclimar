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