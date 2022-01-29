//class 'model'
const mySchema = require('../data/index');
const Authentication = require('../controller/Authentication')
class User {
    constructor(){
        //relembrando 
        //não e necessario 'chamar' os metodos desta class no construtor, pois eles não precisam ser iniciados junto com a instancia da class
    }
    async create(fistname, lastname, email, password){
     
       try {
           let checkemail = await mySchema.select('email').from('users').where('email', email).orWhere('fistname', fistname);
           console.log(checkemail)
           if(checkemail[0]){
               return { status : 406, success : false, mensagem : 'Email ou Fistname invalidos' }
           }
           await mySchema.insert({
                fistname : fistname, 
                lastname : lastname, 
                email :  email, 
                password : password
           }).into('users')
           return {
               status : 200,
               success : true,
               mensagem : 'Usuario criado com sucesso'
           }
       } catch (error) {
           console.log(error)
           return {
               status : 500,
               mensagem : 'aconteceu um erro inesperado ao cadastrar um novo'
           }
       }       
    }
   async findAll(){
        try {
            let result = await mySchema.select('id','fistname', 'lastname', 'email').
            from('users');
            if(!result){
                return {
                    status : 204, 
                    mensagem : {
                        status : 204, 
                        success : false,
                        mensagem : 'Erro ao buscar todos os usuarios'
                    }
                }
            }
            return {
                status : 200,
                success : true,
                users : result
            }
        } catch (error) {
            return {
                status : 500, 
                mensagem : 'aconteceu um erro inesperado'
            }
        }
     }
   async findUser(email, password){
        try {
             let result = await mySchema.column(['id', 'fistname as name', 'email as email']).table('users').where({'email': email, 'password': password});
             //RowDataPacket e um funcão que retorna um objeto...
            if(!result[0]){
                return {
                    status : 200, 
                    success : false,
                    mensagem : 'Nenhum usuario encontrado'
                }
            }
            //CRIANDO UM TOKEN PARA ESTE USUARIO
           let token = await Authentication.authentication(result[0].id, 200);
           return {
               status : 201,
               success : true,
               user : {userID : result[0].id, userEmail : result[0].email},
               Token : token
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
   async update(id, fistname, lastname, password, email){
        try {
            let check = await mySchema.select('id').table('users').where({'id' : id})
            if(!check[0]){
                return {
                    status : 401, 
                    success : false, 
                    mensagem : 'Usuario não encontrado'
                }
            }
            // caso um algum dos parametros do body forem passado como parametro, ele ira atualiza. 
            let result = await mySchema('users').update({fistnasme : fistname, lastname : lastname, password : password, email : email}).where({id : id})
            return{
                status : 201, 
                success : true, 
                mensagem : 'usuario atualizado com sucesso'
            }
        } catch (error) {
            console.log(error)
            return{
                status : 500, 
                mensagem : 'erro ao fazer o update do usuario-model'
            }
        }
     }
    async delete(req, res){
        try {
            let result = await mySchema.where({id : id}).del();
             return{
                 statsu : 200, 
                 success : true,
                 mensagem : 'usuario apagado com sucesso'
             }
        } catch (error) {
            console.log(error)
        }
     }
}
module.exports = User


// //class 'model'
// const mySchema = require('../data/index');
// const Authentication = require('../controller/Authentication')
// class User {
//     constructor(){
//         //relembrando 
//         //não e necessario 'chamar' os metodos desta class no construtor, pois eles não precisam ser iniciados junto com a instancia da class
//     }
//     async create(req, res){
//         let {fistname, lastname,password, email}=req.body
//        try {
//            let checkemail = await mySchema.select('email').from('users').where('email', email);
//            if(checkemail){
//                return res.status(400).json({status : 406, success : false, msg : 'Email ja cadastrado'})
//            }
//           let result = await mySchema.insert({
//                 fistname : fistname, 
//                 lastname : lastname, 
//                 email :  email, 
//                 password : password
//            }).into('users')
//            if(!result){
//               return res.status(406).json({msg : 'Erro, não foi possivel criar novo usuario', success : true,  result : result})
//            }
//            res.status(201).json({msg : 'Usuario criado com sucesso.', result : result})
//        } catch (error) {
//            res.status(500).json({success:false, msg : 'Aconteceu um erro no SERVIDOR ao criar novo usuario. ( Erro no console do serve )'})
//            console.log(error)
//        }       
//     }
//    async findAll(req, res){
//         try {
//             let result = await mySchema.select('id','fistname', 'lastname', 'email').
//             from('users');
//             if(!result){
//                return res.status(204).json({status : 204, success : false, msg : 'Erro ao buscar todos os usuarios'})
//             }
//             res.status(200).json({status : 200, success : true , users : result})
//         } catch (error) {
//             res.status(500).json({erro: 'erro na query (FindAll Users)'})
//             console.log(error)
//         }
//      }
//    async findUser(req, res){
//        let {fistname, email, password} = req.body;
//         try {
//              let result = await mySchema.column(['id', 'fistname as name', 'email as email']).table('users').where({'email': email, 'password': password});
//              //RowDataPacket e um funcão que retorna um objeto...
//             if(!result[0]){
//                 return res.status(404).json({status : 404, success : false, msg : 'Nenhum usuario encontrado'})
//             }
//             //CRIANDO UM TOKEN PARA ESTE USUARIO
//            let token = await Authentication.authentication(result[0].id, 200);
//            res.status(200).json({status : 200, success : true , user : {userId : result[0].id, userEmail : result[0].email}, Token : token})
//         } catch (error) {
//             res.status(500).json({status : 500, success : false, msg : 'erro ao buscar usuario'});
//             console.log(error)
//      }
//     }
//    async update(req, res){
//         let {id} = req.params; //Usuario a ser atualizado
//         let {fistname, lastname, password, email} = req.body; //dados do usuario para ser atualizado

//         try {
//             let check = await mySchema.select(['id']).table('users').where({'id' : id});
//             if(!check[0]){
//                 return res.status(401).json({status : 401, success : false, msg : 'usuario não com id :' + ' id' + 'encontrado'});
//             }
//             // caso um algum dos parametros do body forem passado como parametro, ele ira atualiza. 
//             let result = await mySchema('users').update({fistnasme : fistname, lastname : lastname, password : password, email : email}).where({id : id})
//             res.status(201).json({status : 201, success : true, msg : 'usuario atualizado com sucesso'})
//         } catch (error) {
//             res.status(500).json({erro : 'erro ao fazer o update do usuario'})
//             console.log(error)
//         }
//      }
//     async delete(req, res){
//         let {id} = req.params;
//         try {
//             let result = await mySchema.where({id : id}).del();
//             console.log(result)
//         } catch (error) {
//             console.log(error)
//         }
//      }
// }
// module.exports = User