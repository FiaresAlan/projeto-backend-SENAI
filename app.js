const express = require('express');
const app = express();
const PORT = 8081 || 8080 || 3000;

app.get('/operacao/:tipo', (req, res)=>{
    const { numUm, numDois } = req.query; //soma, multiplicação, subtração, divisão 
    const { tipo } = req.params; //números

    if(isNaN(numUm) || numUm == undefined || numUm == null || isNaN(numDois) || numDois == undefined || numDois == null){
        return res.status(400).send(`Entrada de número inválido!`);}
    const numUmFloat = parseFloat(numUm);
    const numDoisFloat = parseFloat(numDois);

try {
    let resultado;
    switch(tipo){
        case 'soma':
            resultado = (numUmFloat + numDoisFloat).toFixed(2);
            break;
        case 'subtracao':
            resultado = (numUmFloat - numDoisFloat).toFixed(2);
            break;
        case 'multiplicacao':
            resultado = (numUmFloat * numDoisFloat).toFixed(2);
            break;
        case 'divisao':
                if (numberDois === 0 || numberUm === 0){
                    return res.status(400).send(`Não divida por zero`, error)
                }
                resultado = (numberUm / numDois).toFixed(2);
                break;
        default:
            return res.status(400).json({ error: "Tipo de operação inválida. Use 'soma', 'subtração', 'multiplicação' ou 'divisão'." });
                }
res.status(200).send(`O resultado da ${tipo} entre ${numUmFloat} e ${numDoisFloat} é ${resultado}`);
    
} catch (error) {
    return res.status(500).send("Erro reportado no servidor", error)
}});

app.listen(PORT, ()=>{
    console.log(`Servidor esta sendo executado na porta http://localhost:${PORT}`)
}); 