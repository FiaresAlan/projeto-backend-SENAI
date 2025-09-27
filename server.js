const express = require("express");
const app = express();
const PORT = 8081 || 8080 || 3000;
const fs = require("fs");
const CAMINHO_ARQUIVO =  "./produtos.json";

//I will setup the middleware
//All fings that participate in app.user() are enable to 
app.use(express.json());

if (!fs.existsSync(CAMINHO_ARQUIVO)) {
    fs.writeFileSync(CAMINHO_ARQUIVO, '[]');
}

app.post("/produtos", (req, res)=>{
    try {
        const {nome, preco} = req.body;
        if (nome == "" || nome == undefined || preco == undefined || preco == isNaN(preco)) {
            return res.status(400).json({message: `Campos obrigatórios não preenchidos!`});
            }

        const data = fs.readFileSync(CAMINHO_ARQUIVO, "utf-8");
        let produtos = JSON.parse(data);

        //criação de const novoproduto.. ela da o ID sempre correto: 
        // soma a quantia de produtos existentes e soma +1
        const novoProduto = {
            id: produtos.length + 1,
            nome,
            preco
        }
        //o push =  empurrar novos valores ao produtos.json
        produtos.push(novoProduto);

        fs.writeFileSync(CAMINHO_ARQUIVO, JSON.stringify(produtos, null, 4));

        // simulação de inserção no banco
        // console.log(`Produto recebido: ${nome} - R$${preco}`);

        res.status(201).json({
            message: `Produto ${nome} cadastrado com sucesso!`,
            produto: novoProduto
        });
        
    } catch (error) {
        console.error(`Erro ao cadastrar produto ${error}`)
        res.status(500).json({message: `Erro interno no servidor!`});
        }
});








app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});