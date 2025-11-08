const express = require("express");
const cookieParser = require("cookie-parser")
require('dotenv').config();
const app = express();
const {produtoRoutes}= require("./src/routes/produtoRoutes");
const {clienteRoutes} = require("./src/routes/clienteRoutes")

const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser()); 
//ele serve para aceitar cookie na requisição, assim como express.json para aceitar json na requisição

// Rotas da aplicação
app.use('/', produtoRoutes);
app.use('/', clienteRoutes);

app.listen(PORT,()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});