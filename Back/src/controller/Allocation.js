const MOdelAllocation = require("../../src/model/ControllerAllocation");

class Allocation {
  constructor() {}

  async insert(req, res) {
    let allocation = new MOdelAllocation();
    console.log(req.body)
    let { iduser, idproject } = req.params; //iduser, idproject
    let { title, descriptions, start_date, end_date, start_time, end_time } = req.body;
    
    function FormataStringData(data) {
      var dia  = data.split("/")[0];
      var mes  = data.split("/")[1];
      var ano  = data.split("/")[2];
    
      return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);

      // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
    }
   
    try {
      if (title == null) {
        return res.json({
          erro: "não pode inserir um titulo null no banco de dados",
        });
      }
      if (descriptions == null || descriptions == " ") {
        return res.json({ erro: "descriptions não pode ser null" });
      }
      if (start_date == null) {
        return res.json({
          erro: "essa start_date não pode ser inserida no banco de dados",
        });
      }
      if (end_date == null) {
        return res.json({ erro: "end_date invalido." });
      }
      let resul = await allocation.create(iduser, idproject , title, descriptions, FormataStringData(start_date), FormataStringData(end_date), start_time, end_time);
      res.status(resul.status).json(resul);
    } catch (erro) {
      res.status(500).json({erro : 'erro'})
      console.log(erro);
    }
  }
  async findAll(req, res){
      try {
          let allocation = new MOdelAllocation()
          let result = await allocation.findAll()
          return res.json({result})
      } catch (error) {
         return res.status(500).json({erro : 'aconteceu um erro inesperado'})
      }
  }

  async find(req, res){
    let {id} = req.params; //idUser
    try {
        let allocation = new MOdelAllocation();
        let result = await allocation.findById(id);
        return res.status(result.status).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({erro : 'Aconteceu um erro inesperado ao buscar 1 usuario'})
    }
  }
  
  async delete(req, res){
    const {id} = req.params;
    try {
      let alloction = new MOdelAllocation()
     const result = await  alloction.delete(id);
     res.json(result)

    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new Allocation();
