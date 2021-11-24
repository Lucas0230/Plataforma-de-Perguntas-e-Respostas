
// Pegar module
const sequelize = require('sequelize');
// Conectar banco de dados com o JS, por meio do sequelize
const connection = new sequelize('perguntando', 'root', '123456', {         //*senha 123456
    host: 'localhost', // Local do banco de dados
    dialect: 'mysql' // Tipo de banco 
});

// Exportar 
module.exports = connection;