const router = require('express').Router();
const Project = require('../controller/Project');
const Authentication = require('../controller/Authentication')
class ProjectRoutes{
    constructor(){
        this.route = router;
        this.middleware();
        //rotas publicas...
        this.publicRoutes();

        //rotas protegidas
        this.authenticationRoutesPrivate();
        this.privateRoutes();    
    }
    middleware(){
        //colocar os midll.....
    }
    authenticationRoutesPrivate(){
          //validando o token
          //a authenticação deve ser carregada com uma middleware ( routes.use(Authentication) ), pois desta forma os dados serão passada por ela ( req, res, next )
          this.route.use(Authentication.validate)
    }
    publicRoutes(){
        //colocar as rotas publicas aqui
    }
    privateRoutes(){
        this.route.post('/', Project.insert)
        this.route.get('/:id', Project.find)
        this.route.get('/', Project.findAll)
    }
}
module.exports = new ProjectRoutes().route;