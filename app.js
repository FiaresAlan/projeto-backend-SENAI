const express = require('express');
const app = express();
const PORT = 8081 || 8080 || 3000;

app.get("/adicao/:numUm/:numDois", (req, res)=> {
    try {
        const {numUm, numDois} = req.params;
        if (isNaN(numUm) || numUm == undefined || numUm == null || isNaN(numDois) || numDois == undefined || numDois == null){
            return res.status(400).send(`Os valores recebidos não são números ou estão incompletos.`)
        }
        const numeroUm = parseFloat(numUm);
        const numeroDois = parseFloat(numDois);
        const soma = numeroUm + numeroDois;
        res.status(200).send(`Soma realizada dos números ${numeroUm} + ${numeroDois} = ${soma}`);

    } catch (error) {
        console.error(`Erro reportado: `, error);
        res.status(500).send(`Erro interno no servidor!`);
        }
    }
);

app.get("/subtracao/:numUm/:numDois", (req, res)=> {
        try {
        const {numUm, numDois} = req.params;
        if (isNaN(numUm) || numUm == undefined || numUm == null || isNaN(numDois) || numDois == undefined || numDois == null){
            return res.status(400).send(`Os valores recebidos não são números ou estão incompletos.`);
        }
        const numeUm = parseFloat(numUm);
        const numeDois = parseFloat(numDois);
        const subtracao = numeUm - numeDois;
        res.status(200).send(`Subtração realizada dos números ${numeUm} - ${numeDois} = ${subtracao}`);
    } catch (error) {
        console.error(`Erro reportado: `, error);
        res.status(500).send(`Erro interno no servidor!`);
        }
    }
);


app.get("/multiplicacao/:numUm/:numDois", (req, res)=> {
        try {
        const {numUm, numDois} = req.params;
        if (isNaN(numUm) || numUm == undefined || numUm == null || isNaN(numDois) || numDois == undefined || numDois == null){
            return res.status(400).send(`Os valores recebidos não são números ou estão incompletos.`);
        }
        const numberUm = parseFloat(numUm);
        const numberDois = parseFloat(numDois);
        const multiplicacao = numberUm * numberDois;
        res.status(200).send(`Multiplicação realizada dos números ${numberUm} * ${numberDois} = ${multiplicacao}`);
    } catch (error) {
        console.error(`Erro reportado: `, error);
        res.status(500).send(`Erro interno no servidor!`);
        }
    }
);

app.get("/divisao/:numUm/:numDois", (req, res)=> {
        try {
        const {numUm, numDois} = req.params;
        if (isNaN(numUm) || numUm == undefined || numUm == null || isNaN(numDois) || numDois == undefined || numDois == null){
            return res.status(400).send(`Os valores recebidos não são números ou estão incompletos.`);
        }
        const numberOne = parseFloat(numUm);
        const numberTwo = parseFloat(numDois);
        const divisao = numberOne / numberTwo;
        res.status(200).send(`Multiplicação realizada dos números ${numberOne} ➗ ${numberTwo} = ${divisao}`);
    } catch (error) {
        console.error(`Erro reportado: `, error);
        res.status(500).send(`Erro interno no servidor!`);
        }
    }
);

app.listen(PORT, ()=>{
    console.log(`Servidor esta sendo executado na porta http://localhost:${PORT}`)
})