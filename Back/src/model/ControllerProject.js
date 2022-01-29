const mySchema = require('../data/index')
// name_project
// description_project
// maneger_project
// number_project
class Project{
    constructor(){}
    async create (name, description, manager, number){
        try {
            let result = await mySchema.insert({name_project : name, description_project : description, maneger_project : manager, number_project : number}).into('projects');
            return{
                status : 201, 
                success : true, 
                mensagem : 'projecto cadastrado',
                ref : result
            }
        } catch (error) {
            console.log(error)
            return {
                status : 500, 
                success : false, 
                mensagem : 'erro ao criar um project'
            }
        }
    }
    async find (id){
        try {
            let result = await mySchema.select('*').table('projects').where({id : id});
            if(!result){
                return {
                    status : 404, 
                    success : false,
                    mensagem : 'erro, não exite este projeto'
                }
            }
            return {
                status : 201, 
                success : true,
                projects : {
                    name : result[0].name_project,
                     description : result[0].description_project, 
                     maneger: result[0].maneger_project,
                     number : result[0].number_project
                }
            }
        } catch (error) {
            console.log(error)
            return {
                status : 500, 
                success : false, 
                mensagem  : 'erro ao buscar um projeto'
            }
        }
    }
    async findAll (){
        try {
            let result = await mySchema.select('*').table('projects');
            if(!result){
                return {
                    status : 404,
                    success : false,
                    mensagem : 'erro, não foi possveil buscar os projetos'
                }
            }
            return {
                status : 201,
                success : true, 
                projetos : result
            }
        } catch (error) {
            console.log(error)
            return {
                status : 500, 
                success : false, 
                mensagem : 'aconteceu um erro inesperado'
            }
        }
    }

    // async create (){
    //     try {
            
    //     } catch (error) {
            
    //     }
    // }
}
module.exports = Project