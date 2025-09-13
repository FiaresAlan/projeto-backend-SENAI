const express = require('express');
const app = express();
const PORT = 8081 || 8080 || 3000;

app.get("/calculadora", (req, res)=>{
    try {
        const {operacao, numUm, numDois} = req.query;
        
        if(isNaN(numUm) || numUm == undefined || numUm == null || isNaN(numDois) || numDois == undefined || numDois == null){
            return res.status(400).send(`Entrada de número inválido!`);
        }
        const numberUm = parseFloat(numUm);
        const numberDois = parseFloat(numDois);
        let resultado;
        switch (operacao) {
            case "soma":
                resultado = (numberUm + numberDois).toFixed(2);
                break;
            
            case "subtracao":
                resultado = (numberUm - numberDois).toFixed(2);
                break;
            
            case "multiplicacao":
                resultado = (numberUm * numberDois).toFixed(2);
                break;
            
            case "divisao":
                if (numberDois === 0 || numberUm === 0){
                    return res.status(400).send(`Não divida por zero`, error)
                }
                resultado = (numberUm / numDois).toFixed(2);
                break;
            default:
                return res.status(400).send("Erro ocorreu:", error)
        }
    res.send(`O resultado da operação é ${numberUm} e ${numDois} = ${resultado}`)
    }
    catch (error) {
        return console.error(`Erro reportado `, error)
    }
})

app.listen(PORT, ()=>{
    console.log(`Servidor esta sendo executado na porta http://localhost:${PORT}`)
})   