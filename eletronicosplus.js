const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Configuração básica
const app = express();
app.use(bodyParser.json()); // para ler o corpo da requisição no formato JSON

// Conexão do banco de dados
mongoose.connect("mongodb://127.0.0.1:27017/eletronicosplus", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Criação de modelos
const usuarioSchema = new mongoose.Schema({
  Usuario: { type: String },
  password: { type: String, required: true }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

const produtoEletronicoSchema = new mongoose.Schema({
  Nome: { type: String },
  Preco: { type: Number, required: true }
});

const ProdutoEletronico = mongoose.model('ProdutoEletronico', produtoEletronicoSchema);

// Rota de cadastro de Usuário
app.post("/cadastroeletronicosplus", async (req, res) => {
  const { Usuario, password } = req.body;

  if (Usuario == null || password == null) {
    return res.status(400).json({ error: "Digite os campos!!!" });
  }

  const novoUsuario = new Usuario({
    Usuario: Usuario,
    password: password
  });

  try {
    const novoUsuarioSalvo = await novoUsuario.save();
    res.json({ error: null, msg: "Cadastro de usuário ok!!!", userId: novoUsuarioSalvo.id });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Rota de cadastro de Produto Eletrônico
app.post("/cadastroprodutoeletronico", async (req, res) => {
  const { Nome, Preco } = req.body;

  if (Nome == null || Preco == null) {
    return res.status(400).json({ error: "Digite os campos!!!" });
  }

  const novoProdutoEletronico = new ProdutoEletronico({
    Nome: Nome,
    Preco: Preco
  });

  try {
    const novoProdutoEletronicoSalvo = await novoProdutoEletronico.save();
    res.json({ error: null, msg: "Produto eletrônico cadastrado com sucesso!", produtoId: novoProdutoEletronicoSalvo.id });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Rota de leitura da porta
app.listen(3000, () => {
  console.log("Rodando na porta 3000");
});

  