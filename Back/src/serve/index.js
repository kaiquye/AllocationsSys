const express = require('express')
const routerAllocation = require('../routes/Allocation')
const routerProject = require('../routes/Project')
const routerUsers = require('../routes/Users')
const cors = require('cors')


class Serve {
    constructor(){
        this.app = express() 
        this.middleware()
        this.routes()
    }
    middleware(){
        this.app.use(express.json())
        this.app.use(cors())
    }
    routes(){
        this.app.use('/users', routerUsers)
        this.app.use('/project', routerProject)
        this.app.use('/allocation', routerAllocation)
    }
}

module.exports = new Serve().app