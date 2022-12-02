import {db} from '../db.js';
export const getUsers =(_,res)=>{
    const q = "SELECT * FROM usuarios";

    db.query(q,(err,data)=>{
        if(err) return res.json(err);

        return res.status(200).json(data);
    });
};
export const addUser = (req, res) => {
    const q =
      "INSERT INTO usuarios(`nome`, `nota1`, `nota2`) VALUES(?)";
  
    const values = [
      req.body.nome,
      req.body.nota1,
      req.body.nota2,


    ];
  
    db.query(q, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Usuário criado com sucesso.");
    });
  };

  export const updateUser = (req, res) => {
    const q =
      "UPDATE usuarios SET `nome` = ? `nota1` =?,`nota2`=? WHERE `id` = ?";
  
    const values = [
      req.body.nome,
      req.body.nota1,
      req.body.nota2,
     
 
    ];
  
    db.query(q, [...values, req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Usuário atualizado com sucesso.");
    });
  };

  export const deleteUser = (req, res) => {
    const q = "DELETE FROM usuarios WHERE `id` = ?";
  
    db.query(q, [req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Usuário deletado com sucesso.");
    });
  };
    