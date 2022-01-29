//class model
//id_
//id_user
//title
//descriptions
//start_date
//end_data
//start_time
//end_time
const mySchema = require("../data/index");
class Allocation {
  constructor() {}
  async create(  iduser, idproject , title, descriptions, start_date, end_date, start_time, end_time) {
    console.log('0000000000000000000000000000000000000000000000000000000')
    console.log(end_date)
    try {
      let result = await mySchema
        .insert({
          id_user: iduser,
          id_project: idproject,
          title: title,
          descriptions: descriptions,
          start_date: start_date,
          end_date : end_date,
          start_time: start_time,
          end_time: end_time,
        })
        .into("allocation");
     if(!result){
       return{
         status : 401, 
         success : false,
         mensagem : 'erro ao criar uma nova allcção'
       }
     }
     return {
       status : 201, 
       success : true,
       mensagem : 'allocação criado com sucesso'
     }
    } catch (error) {
        console.log(error)
        return {
          status : 500,
          mensagem : 'erro ao criar uma alocação'
        }
    }
  }
  async findAll (){
      try {
        let result = await mySchema.select('id_user', 'title', 'descriptions', 'start_date', 'end_date', 'start_time', 'end_time', 'id_project', 'fistname', 'name_project', 'description_project', 'number_project','maneger_project as manegar').from('allocation').join('users', 'id_user', 'users.id').join('projects', 'id_project', 'projects.id');
        return {
          status : 200,
          success : true, 
          allocations : result
        }
      } catch (error) {
        return {
          status : 500,
          mensagem : 'erro ao buscar as alocações'
        }
      }
  }
  async findById(id){
      try {
        const check = await mySchema.select('id').from('users').where({id : id});
        if(!check[0]){
          return {
              status : 401, 
              success : false, 
              mensagem :'erro (join) não foi possivel buscar alocações deste usuario'
          }
        }
          const result = await mySchema.select('allocation.id','id_user', 'title', 'descriptions', 'start_date', 'end_date', 'start_time', 'end_time', 'id_project', 'fistname', 'name_project', 'description_project', 'number_project','maneger_project as manegar'  ).from('allocation').join('users', 'id_user', 'users.id').join('projects', 'id_project', 'projects.id').where({id_user : id})
          if(!result[0]){
            return{
              status : 200,
              success : true,
              mensagem : 'este usuario não tem alocações'
            }
          }
          return {
            success : true, 
            status : 201,
            result : result
          }
      } catch (error) {
        console.log(error)
        return{
          status : 500,
          erro : 'erro'
        }
      }
  }
  async delete (id){
    try {
        const result = await mySchema.where({id : id}).del().from('allocation')
        return {
          status : 200, 
          success : true
        }
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}
  // async create (){
  //     try {

  //     } catch (error) {

  //     }
  // }
  // async create (){
  //     try {

  //     } catch (error) {

  //     }
  // }
}

module.exports = Allocation;
