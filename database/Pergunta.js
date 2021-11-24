const sequelize = require('sequelize');
const connection = require('./database');

// Criando Model

const Pergunta = connection.define('pergunta', { // abrindo JSON

    titulo: {
        type: sequelize.STRING,
        allowNull: false // Impede que o campo receba valores nulos
    }
    ,
    descricao: {
        type: sequelize.TEXT,
        allowNull: false
    }

})

// Sincronizar com banco de dados, caso não exista ele criará a tabela Pergunta
// e por conta disso {force: false} não criará caso já exista

Pergunta.sync({force: false}).then(() =>{
    console.log('Tabela criada!')
})

module.exports = Pergunta;