/* Aqui são os controladores dos professores*/

import connection from '../connection.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginUser = async (req, res) => {
  const { email, senha } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Campo email é obrigatório.' });
  }
  if (!senha) {
    return res.status(400).json({ message: 'Campo senha é obrigatório.' });
  }
  try {
    const { rowCount, rows } = await connection.query(
      'SELECT * FROM cadastro_professores WHERE email = $1',
      [email]
    );
    if (rowCount === 0) {
      return res.status(400).json({ message: 'Email e/ou senha inválido(s)' });
    }
    const user = rows[0];

    const verifiedPassword = await bcrypt.compare(senha, user.senha);
    if (user.email !== email || !verifiedPassword) {
      return res.status(400).json({ message: 'Email e/ou senha inválido(s)' });
    }

    let { senha: password, ...userWithoutPassword } = user;

    const token = jwt.sign(
      {
        id: user.id,
        nome: user.nome,
        email: user.email
      },
      process.env.API_SECRET,
      {
        expiresIn: '2h'
      }
    );
    return res.status(200).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export { loginUser };
