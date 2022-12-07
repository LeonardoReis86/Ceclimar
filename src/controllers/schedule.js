/*Aqui são os controladores dos agendamentos de aula
- Precisa ainda pegar o id_professor utilizando o token de autenticação.
- Adicionar uma trava no para_quando, para se houver outras aulas marcadas. 
*/
/* 3 labs, podendo ser marcados ao mesmo tempo. O horário da marcação é o turno inteiro.*/

import connection from '../connection.js';

const registerSchedule = async (req, res) => {
  const { turma, quantidade_alunos, quando_marcado, para_quando } = req.body;

  if (!turma) {
    return res.status(400).json({ message: 'Campo turma é obrigatório' });
  } else if (!quantidade_alunos) {
    return res.status(400).json({
      message: 'Campo quantidade_alunos é obrigatório ou não pode ser zero'
    });
  } else if (quantidade_alunos < 0) {
    return res.status(400).json({
      message: 'Campo quantidade_alunos não pode ser negativo'
    });
  } else if (!quando_marcado) {
    return res
      .status(400)
      .json({ message: 'Campo quando_marcado é obrigatório' });
  } else if (!para_quando) {
    return res.status(400).json({ message: 'Campo para_quando é obrigatório' });
  }
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
    return res.status(400).json({ mensagem: error.message });
  }
};

export { registerSchedule };
