const express = require('express');
const app = express();
const PORT = 8080 || 3000 || 8081
const fs = require("fs"); //fs: filesystem serve para manipular pastas e arq. do seu sistem operacional

app.get("/produtos", (req, res) => {

    try {
        //lendo arquivo JSON
        const data = fs.readFileSync("./produtos.json", "utf-8"); // pra dizer que o arquivo esta na mesma pasta, use:  "./arquivo"

        //transformando o JSON em objeto JS
        let produtos = JSON.parse(data);

        const { nomeProduto, vMin, vMax } = req.query; //serve para desestruturação

        if (nomeProduto) {

            produtos = produtos.filter(produto =>
                produto.nome.toLowerCase()//padroniza toda str pra minusculo(pra busca)
                    .includes(nomeProduto.toLowerCase())
            ); //ele vai manter apenas os produtos que atenderem uma condição
        }
        if(isNaN(vMax) || vMax == null){
            return res.status(400).send(`Entrada inválida do Valor Max.`)}
        if(isNaN(vMin) || vMin == null){
                return res.status(400).send(`Entrada inválida do Valor Min.`)}

        if (vMin) {
            produtos = produtos.filter(produto =>
                produto.preco >= vMin)
        }

        if (vMax) {
            produtos = produtos.filter(produto =>
                produto.preco <= vMax)
        }

        res.status(200).json(produtos);


    } catch (error) {
        console.error(`Erro ao ler o arquivo JSON ${error}`);
        res.status(500).json({ message: "Erro interno no servidor" });
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`)
})