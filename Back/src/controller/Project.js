const ModelProject = require("../../src/model/ControllerProject");

class Project {
  constructor() {}

  async insert(req, res) {
    let project = new ModelProject();
    const {name, description, manager, number} = req.body;
    try {
      if (name == null) {
        return res.json({
          erro: "não pode inserir um name null no banco de dados",
        });
      }
      if (description == null || description == " ") {
        return res.json({ erro: "descriptions não pode ser null" });
      }
      if (manager == null) {
        return res.json({
          erro: "essa manager não pode ser inserida no banco de dados",
        });
      } 
      if (number == null) { 
        return res.json({ erro: "number invalido." });
      }
      let resul = await project.create(name, description, manager, number);
      res.status(resul.status).json(resul);
    } catch (erro) {
      res.status(500).json({erro : 'erro'})
      console.log(erro);
    }
  }
  async findAll(req, res){
      try {
          let project = new ModelProject();
          let result = await project.findAll()
          return res.json({result})
      } catch (error) {
         return res.status(500).json({erro : 'aconteceu um erro inesperado'})
      }
  }

  async find(req, res){
    let {id} = req.params;
    try {
        let project = new ModelProject();;
        let result = await project.find(id);
        return res.status(result.status).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({erro : 'Aconteceu um erro inesperado ao buscar um project'})
    }
  }
}

module.exports = new Project();
