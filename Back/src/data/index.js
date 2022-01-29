//caso queira carregar as configurações diretamente da 
// pasta do knex.....
// const fileknex = require('../../knexfile')
// const knex = require('knex')(fileknex.development)
//---------------------------------------------------
const knex = require('knex')({
    client : 'mysql', 
    connection : {
        host : 'localhost', 
        user : 'root',
        password : '1234', 
        database : 'projetoalocacoes'
    }
})
module.exports = knex