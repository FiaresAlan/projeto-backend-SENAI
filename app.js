// Tarefas:
// 1. Crie um arquivo usuarios.json com ao menos 5 usuários, contendo campos id, nome, email.
// Implemente uma rota GET /usuarios que: 
// leia este arquivo usando o módulo fs.
// converta o conteúdo para objeto JavaScript.
// retorne a lista completa de usuários com status 200.
// utilize try...catch para capturar falhas de leitura ou parse e responder com status 500 caso ocorra erro.

// 2. Partindo da mesma base do usuarios.json:  
// implemente um filtro via query parameter chamado nome.
// filtre os usuários cujo nome contenha o texto pesquisado (ignorando maiúsculas/minúsculas).
// responda status 200 com o resultado filtrado.
// se ocorrer erro ao ler o arquivo, devolva status 500 no catch.

// 3. Crie um arquivo eventos.json com eventos contendo campos id, nome, data.
// Crie a rota GET /eventos que aceite um query parameter data para filtrar eventos em determinada data:
// Exemplo: GET /eventos?data=2025-08-10.
// responda status 200 com os eventos daquela data, ou 500 se ocorrer erro no try/catch.

const express = require('express');
const app = express();
const PORT = 8080 || 8081 || 3031;
const fs = require("fs");

//Task 01
app.get("/usuarios", (req, res)=>{
    try {
        const data = fs.readFileSync("./usuarios.json", "utf-8");
        let usuarios = JSON.parse(data)
        //Task 02
        const {nomeUser} = req.query;

        if (nomeUser) {
            usuarios = usuarios.filter(usuario=>usuario.nome.toLowerCase().includes(nomeUser.toLowerCase()))
        }
        res.status(200).json(usuarios)


    } catch (error) {
        console.error(`Erro ao ler o arquivo usuarios.JSON ${error}`);
        res.status(500).json({message: "Erro interno no servidor POST 500."})
    }
})
//Task 03
app.get("/eventos", (req, res)=>{
    try {
        const dado = fs.readFileSync("./eventos.json", "utf-8");
        let eventos = JSON.parse(dado);
        const {dataEvento} = req.query;

        if (dataEvento) {
            eventos = eventos.filter(evento => evento.data <= dataEvento)
        }
        
        res.status(200).json(eventos)
        
    } catch (error) {        
        console.error(`Erro ao ler o arquivo eventos.JSON ${error}`);
        res.status(500).json({message: "Erro interno no servidor POST 500."})     
    }
})



app.listen(PORT, ()=>{
    console.log(`Servidor sendo executado na porta http://localhost:${PORT}`)
});