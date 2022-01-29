const router = require('express').Router();
const Allocation = require('../controller/Allocation')
const Authentication = require('../controller/Authentication')
class AllocationRouter{
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
        this.route.post('/:iduser/:idproject', Allocation.insert)
        this.route.get('/', Allocation.findAll)
        this.route.get('/:id', Allocation.find)
        this.route.delete('/:id', Allocation.delete)
    }
}
module.exports = new AllocationRouter().route;