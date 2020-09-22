const http =require('http');
const express =require('express');
const bodyParser =require('body-parser');
const upload = require("multer")();

const app = express();
app.use(require("cors")());
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.json({message: "Tudo ok por aqui!"});
})
 

app.post('/send', upload.single('anexo'), (req, res, next) => { 
    const nome = req.body.nome;
    const email = req.body.email;
    const mensagem = req.body.mensagem;
    const anexo = req.file;
    require("./src/nodemail")(email, nome, mensagem, anexo)
        .then(response => res.json(response))
        .catch(error => res.json(error));
})

// app.post('/send', (req, res, next) => { 
//     res.json(req.body);
// }) 
 
const server = http.createServer(app); 
server.listen(3333);
console.log("Servidor escutando na porta 3333...")