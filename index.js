// Adicionar express
const express = require('express');
const app = express();

// Adicionar model de tabela no database
const Pergunta = require('./database/Pergunta');

const Resposta = require('./database/Resposta')

// Adicionar conexão com database
const connection = require('./database/database');

// Autenticar database
connection.authenticate()
    // Se der certo
    .then(() =>{
        console.log('Conexão com o banco de dados feita com sucesso!')
    })
    // Se não der
    .catch(() =>{
        console.log('Erro na conexão de dados!')
    })

//  


// Tradutor de dados
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Usar EJS como view engine
app.set('view engine', 'ejs');

// Pasta public para css
// app.set(express.static('public'));

app.use(express.static(__dirname + '/public'));

// Ligar servidor
app.listen(8080, ()=>{

    console.log('Servidor rodando!')
});

// Criar rota
app.get('/', (req,res)=>{

    Pergunta.findAll({ raw: true, order: [              // RAW == cru, ou seja, apenas os dados, sem desnecessário
        ['id', 'DESC']                                  // Ordem, para crescente ASC e descrescente DESC

    ] }).then(perguntas =>{                     


        res.render('index', {

            perguntas: perguntas
        });

        
        
    })

});

app.get('/perguntar', (req, res)=>{

    res.render('perguntar');
});


app.get('/pergunta/:id' ,(req, res) => {
    
    var id = req.params.id  // Pegar ID

    Pergunta.findOne({      // procurar na tabela (Pergunta) 'onde' id é igual id
        where: {id:id}

    }).then(pergunta=>{

       
        if (pergunta != undefined) {

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [ ['id', 'DESC'] ]
            }).then(respostas =>{
                res.render('pergunta', {
                    pergunta: pergunta,   // Passar váriavel pergunta para a  página
                    respostas: respostas 
                })
            })
           
        } else {

            res.redirect('/')
        }
    })
})

// Rota para receber dados (POST)
app.post('/salvarpergunta', (req, res)=>{

    var titulo = req.body.titulo; //titulo = nome do campo em que vai o titulo
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() =>{
        console.log('Pergunta registrada!')
        res.redirect('/')
    })
});

app.post('/responder', (req, res) => {

    var texto = req.body.texto;
    var perguntaId = req.body.pergunta;

    Resposta.create({

        texto: texto,
        perguntaId: perguntaId
    }).then(() =>{
        console.log('Resposta registrada!')
        res.redirect('/pergunta/' + perguntaId)
    })
})