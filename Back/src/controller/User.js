const User = require("../../src/model/ControllerUser");
const ModelUser = require("../../src/model/ControllerUser");

class UserController {
  constructor() {}

  async insert(req, res) {
    let { fistname, lastname, password, email } = req.body;
    let user = new ModelUser()
    console.log(fistname)
    try {
      if (fistname == null) {
        return res.json({
          erro: "não pode inserir um nome null no banco de dados",
        });
      }
      if (lastname == null || lastname == " ") {
        return res.json({ erro: "lastname não pode ser null" });
      }
      if (password == null || password <= 3) {
        return res.json({
          erro: "essa senha não pode ser inserida no banco de dados",
        });
      }
      if (email == null || email == " ") {
        return res.json({ erro: "email invalido." });
      }
      let resul = await user.create(fistname, lastname, email, password);
      res.status(200).json(resul);
    } catch (erro) {
      console.log(erro);
    }
  }
  async findAll(req, res){
      try {
          let user = new ModelUser()
          let result = await user.findAll()
          return res.json({result})
      } catch (error) {
         return res.status(500).json({erro : 'aconteceu um erro inesperado'})
      }
  }

  async find(req, res){
    console.log(req)
    let {email, password} = req.body;
    try { 
        let user = new ModelUser();
        let result = await user.findUser(email, password);
        return res.status(result.status).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({erro : 'Aconteceu um erro inesperado ao buscar 1 usuario'})
    }
  }
  async update(req, res){
    let {id} = req.params; //Usuario a ser atualizado
    let {fistname, lastname, password, email} = req.body; //dados do usuario para ser atualizado

    try {
        let user = new ModelUser();
        let result = await user.update(id, fistname, lastname, password, email);
        return res.status(result.status).json(result)
    } catch (error) {
        res.status(500).json({erro : 'aconteceu um erro inesperado'})
    }
  }
  
  async delete(req, res){
    let {id} = req.params;
    try {
        let user = new ModelUser();
        let result = await user.delete(id);
        return res.status(result.status).json(result)
    } catch (error) {
        res.status(500).json({mensagem : 'erro ao deletar usuario'})
    }  
  }
}

module.exports = new UserController();
