/*Aqui são os controladores dos agendamentos de aula*/

/* A fazer:
- Precisa ainda pegar o id_professor utilizando o token de autenticação.
- Adicionar uma trava no para_quando, para se houver mais de três aulas marcadas.
- Adicionar mais validações, em disciplina, aula prática e turno, para evitar que quaisquer palavras passem.
*/
/* 3 labs, podendo ser marcados ao mesmo tempo. O horário da marcação é o turno inteiro.*/

import connection from '../connection.js';

const registerSchedule = async (req, res) => {
  const {
    disciplina,
    aula_pratica,
    turno,
    laboratorio,
    para_quando,
    observacao
  } = req.body;

  if (!disciplina) {
    return res.status(400).json({ message: 'Campo disciplina é obrigatório' });
  } else if (!aula_pratica) {
    return res
      .status(400)
      .json({ message: 'Campo aula prática é obrigatório' });
  } else if (!turno) {
    return res.status(400).json({
      message: 'Campo turno é obrigatório'
    });
  } else if (!laboratorio) {
    return res.status(400).json({
      message: 'Campo laboratório é obrigatório'
    });
  } else if (laboratorio != 106 && laboratorio != 117 && laboratorio != 126) {
    return res.status(400).json({ message: 'Número do laboratório incorreto' });
  } else if (!para_quando) {
    return res.status(400).json({ message: 'Campo para_quando é obrigatório' });
  }

  try {
    const dataAtual = new Date();
    const { rowCount, rows } = await connection.query(
      'INSERT INTO agendamento_aulas (disciplina, aula_pratica, turno, laboratorio, quando_marcado, para_quando, observacao) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
        disciplina,
        aula_pratica,
        turno,
        laboratorio,
        dataAtual,
        para_quando,
        observacao
      ]
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
