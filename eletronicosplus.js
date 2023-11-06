//instalando programas
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");


//configurando o roteamento para teste no postman
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;


//configurando o acesso ao mongodb
mongoose.connect('mongodb://127.0.0.1:27017/produtoeletronico',
{   useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS : 20000
});


//criando a model do seu projeto
const usuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : { type : String}
});


const Usuario = mongoose.model("usuario", usuarioSchema);


//configurando os roteamentos
app.post("/cadastrousuario", async(req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha

    const usuario = new Usuario({
        email : email,
        senha : senha
    })


    try{
        const newusuario = await usuario.save();
        res.json({error : null, msg : "Cadastro ok", UsuarioId : newusuario._id});
    } catch(error){
        res.status(400).json({error});
    }


});

//criando a model do seu projeto
const produtoeletronicoSchema = new mongoose.Schema({
    id_produtoeletronico: {type : String, required : true},
    descricao: {type : String},
    marca: { type : String},
    data: {type : Date},
    garantia: {type : Number}
});


const Produtoeletronico = mongoose.model("produtoeletronico", produtoeletronicoSchema);


//configurando os roteamentos
app.post("/cadastroprodutoeletronico", async(req, res)=>{
    const id_produtoeletronico =  req.body.id_produtoeletronico;
    const descricao = req.body.descricao;
    const marca = req.body.marca;
    const data = req.body.data;
    const garantia = req.body.garantia


    const produtoeletronico = new Produtoeletronico({
        id_produtoeletronico : id_produtoeletronico,
        descricao: descricao,
        marca: marca,
        data: data,
        garantia: garantia
    })


    try{
        const newprodutoeletronico = await produtoeletronico.save();
        res.json({error : null, msg : "Cadastro ok", produtoeletronicoId : newprodutoeletronico._id});
    } catch(error){
        res.status(400).json({error});
    }


});


app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
})


//configurando a porta
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})
