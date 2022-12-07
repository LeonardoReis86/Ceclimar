/*Aqui são os controladores dos agendamentos de aula
- Precisa ainda pegar o id_professor utilizando o token de autenticação.
- Adicionar uma trava no para_quando, para se houver outras aulas marcadas. 
*/

import connection from '../connection.js';

const registerSchedule = async (req, res) => {
  const { turma, quantidade_alunos, quando_marcado, para_quando } = req.body;
  try {
    const { rowCount, rows } = await connection.query(
      'INSERT INTO agendamento_aulas (turma, quantidade_alunos, quando_marcado, para_quando) VALUES ($1, $2, $3, $4) RETURNING *',
      [turma, quantidade_alunos, quando_marcado, para_quando]
    );
    if (rowCount === 0) {
      return res
        .status(400)
        .json({ message: 'Não foi possível registrar o usuário' });
    }
    const user = rows[0];
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export { registerSchedule };
