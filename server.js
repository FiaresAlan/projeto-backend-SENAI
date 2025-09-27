const express = require("express");
const app = express();
const PORT = 8081 || 8080 || 3000;
const fs = require("fs");
const CAMINHO_ARQUIVO = "./livros.json";

//I will setup the middleware
//All fings that participate in app.user() are enable to 
app.use(express.json());

if (!fs.existsSync(CAMINHO_ARQUIVO)) {
    fs.writeFileSync(CAMINHO_ARQUIVO, '[]');
}

app.post("/cadastro-livro", (req, res) => {
    try {
        const { titulo, autor, anoPublicacao, exemplares } = req.body;

        if (titulo == "" || titulo == undefined || autor == "" || autor == undefined
            || anoPublicacao == undefined || anoPublicacao == isNaN(anoPublicacao)
            || exemplares == undefined || exemplares == isNaN(exemplares)) {
            return res.status(400).json({ message: `Campos obrigatórios não preenchidos!` });
        }

        const data = fs.readFileSync(CAMINHO_ARQUIVO, "utf-8");
        let livros = JSON.parse(data);

        const novoLivro = {
            id: livros.length + 1,
            titulo,
            autor,
            anoPublicacao,
            exemplares
        }
        //o push =  empurrar novos valores ao livros.json
        livros.push(novoLivro);

        fs.writeFileSync(CAMINHO_ARQUIVO, JSON.stringify(livros, null, 4));

        // simulação de inserção no banco
        // console.log(`Produto recebido: ${nome} - R$${preco}`);

        res.status(201).json({
            message: `Produto ${titulo} cadastrado com sucesso!`,
            produto: novoLivro
        });

    } catch (error) {
        console.error(`Erro ao cadastrar livro ${error}`)
        res.status(500).json({ message: `Erro interno no servidor!` });
    }
});

app.get("/catalogo", (req, res) => {
    
    try {
        const { titulo } = req.query;
        
        const dados = fs.readFileSync(CAMINHO_ARQUIVO, "utf-8");
        let catalogoLivros = JSON.parse(dados);
        
        if (titulo) {
            catalogoLivros = catalogoLivros.filter(livro=>livro.titulo.toLowerCase().includes(titulo.toLowerCase()))
        }
        res.status(200).json(catalogoLivros)


    } catch (error) {
        console.error(`Erro ao cadastrar livro ${error}`)
        res.status(500).json({ message: `Erro interno no servidor!` });
    }
})








app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});