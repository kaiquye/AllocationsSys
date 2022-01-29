const router = require('express').Router();
const Authentication = require('../controller/Authentication');
const User = require('../../src/controller/User')
class UsersRoutes{
    constructor(){
        this.route = router;
        this.middleware();

        //rotas publicas, sem authenticação...
        this.publicRoutes();
        //rotas protegidas...
        this.authenticationRoutesPrivate();
        this.privateRoutes();    
    }
    middleware(){
        //colocar os middleware aqui......
    }
    authenticationRoutesPrivate(){
        //validando o token
        //a authenticação deve ser carregada com uma middleware ( routes.use(Authentication) ), pois desta forma os dados serão passada por ela ( req, res, next )
        this.route.use(Authentication.validate)
    }
    publicRoutes(){
        this.route.post('/register', User.insert)
        this.route.post('/login', User.find)
    }
    privateRoutes(){
    //     let user = new User()
        this.route.get('/', User.findAll)
        this.route.delete('/:id:id2', User.delete)
        this.route.patch('/:id', User.update)
    }
}
module.exports = new UsersRoutes().route;