import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'ceclimar'
});

/*
No user, password, host e port coloca o que está nos campos User, Password, Host e Port no Beekeeper, respectivamente.
O database não precisa alterar (já que o nome do banco de dados é o mesmo) 
*/

const query = (text, params) => {
  return pool.query(text, params);
};

export default { query };
