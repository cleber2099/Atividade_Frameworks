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
      "INSERT INTO usuarios(`nome`, `nota1`, `nota2`, `media`, `situacao`) VALUES(?)";
  
   //  situação do aluno:o “aprovado”, média >= 7o “recuperação”, média >= 4 e média < 7o “reprovado”, média < 4

   var soma = parseFloat(req.body.nota1) + parseFloat(req.body.nota2) ;
    var media = soma / 2;
    var situacao = "";
    if(media >= 7){
        situacao = "aprovado";
    }else if(media >= 4 && media < 7){
        situacao = "recuperação";
    }else{
        situacao = "reprovado";
    } 

    const values = [
      req.body.nome,
      req.body.nota1,
      req.body.nota2,
      media,
      situacao

    ];
  
    db.query(q, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Aluno Adicionado");
    });
  };

  export const updateUser = (req, res) => {
    const q =
      "UPDATE usuarios SET `nome` = ?, `nota1` =?,`nota2`=?, `media`=?, `situacao`=? WHERE `id` = ?";
    
      var soma = parseFloat(req.body.nota1) + parseFloat(req.body.nota2) ;
      var media = soma / 2;
      var situacao = "";
      if(media >= 7){
          situacao = "aprovado";
      }else if(media >= 4 && media < 7){
          situacao = "recuperação";
      }else{
          situacao = "reprovado";
      } 
  
  
    const values = [
 
      req.body.nome,
      req.body.nota1,
      req.body.nota2,
      media,
      situacao,


    ];
  
    db.query(q, [...values, req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Aluno atualizado.");
    });
  };

  export const deleteUser = (req, res) => {
    const q = "DELETE FROM usuarios WHERE `id` = ?";
  
    db.query(q, [req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Aluno deletado .");
    });
  };
    